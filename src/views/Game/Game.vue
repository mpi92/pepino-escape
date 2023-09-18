<script setup lang="ts">
import { onMounted, ref } from 'vue';
import preload from './resources/preload';
import useScore from '@/utils/useScores';
import usePlayerState from '@/utils/usePlayerState';
import BasicLayout from '@/components/BasicLayout/BasicLayout.vue';
import Loader from '@/components/Loader/Loader.vue';
import MarkerButton from '@/components/MarkerButton/MarkerButton.vue';
import Button from '@/components/Button/Button.vue';

const isLoading = ref(false);
const isEnded = ref(false);
const isInterrupted = ref(false);
const score = ref(0);
const canvasRef = ref(null);

const { setScore } = useScore();
const { playerName } = usePlayerState();

async function onEnd(endData: { [key: string]: any }) {
  isLoading.value = true;
  await setScore(playerName.value, endData);
  isLoading.value = false;

  score.value = endData.score;
  isEnded.value = true;
}

function onInterrupt() {
  isInterrupted.value = true;
}

async function handleInit() {
  isInterrupted.value = false;
  isLoading.value = true;
  isEnded.value = false;

  const { sounds, images } = await preload();
  const { default: init } = await import('./resources/init');

  isLoading.value = false;

  init({
    sounds,
    images,
    canvasElement: canvasRef.value,
    onEnd,
    onInterrupt,
  });
}

onMounted(handleInit);
</script>

<template>
  <div class="w-full h-full">
    <Loader v-if="isLoading" />
  
    <BasicLayout
      v-else-if="isEnded || isInterrupted"
    >
      <template #title>
        Game over
      </template>
  
      <template #content>
        <div class="wrapper flex-col text-center">
          <div v-if="isEnded">
            <div class="text-[10rem]">
              {{ score }}
            </div>
          </div>
    
          <div v-else-if="isInterrupted">
            <div
              class="text-3xl"
            >
              The game was interrupted
            </div>
            <div class="mt-6">
              Please focus and play nice
            </div>
          </div>

          <Button
            class="mt-10"
            @click="handleInit"
          >
            Retry
          </Button>
        </div>
      </template>
  
      <template #nav>
        <MarkerButton
          to="/home"
        >
          &lt; Home
        </MarkerButton>
  
        <MarkerButton
          to="/scores"
        >
          Scores >
        </MarkerButton>
      </template>
    </BasicLayout>
  
    <canvas
      v-show="!isLoading && !isEnded && !isInterrupted"
      ref="canvasRef"
      id="game"
      width="1000"
      height="800"
      class="cursor-none bg-neutral-900"
    />
  </div>
</template>