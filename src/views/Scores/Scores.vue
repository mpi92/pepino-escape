<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import useScores from '@/utils/useScores';
import BasicLayout from '@/components/BasicLayout/BasicLayout.vue';
import Loader from '@/components/Loader/Loader.vue';
import ContentBox from '@/components/ContentBox/ContentBox.vue';
import MarkerButton from '@/components/MarkerButton/MarkerButton.vue';

const { getScores, scores } = useScores();

const isLoading = ref();
const emptyScores = computed(() => !scores.value.length);

onMounted(async () => {
  isLoading.value = true;
  await getScores();
  isLoading.value = false;
});
</script>

<template>
  <div class="w-full h-full">
    <Loader v-if="isLoading"/>
  
    <BasicLayout v-else>
      <template #title>
        Top scores
      </template>
  
      <template #content>
        <ContentBox
          v-if="!emptyScores"
          class="text-xl max-h-[25rem] overflow-scroll w-full m-auto"
        >
          <div
            v-for="{ player, score, collected } in scores"
            class="flex items-center justify-between text-lg"
          >
            <div class="flex items-center gap-2">
              {{ player }}
              <span
                class="flex items-center text-xs"
              >
                (<img class="w-4 h-4" src="/images/tuna_can.png" alt="tuna can">
                <span class="text-tiny">x</span>{{ collected.tunaCans }}
              </span>
              <span
                class="flex items-center text-xs"
              >
              <img class="w-4 h-4" src="/images/gravity_ball.png" alt="gravity ball">
              <span class="text-tiny">x</span>{{ collected.gravityBalls }})
              </span>
            </div>
      
            <div>
              {{ score }}
            </div>
          </div>
        </ContentBox>
    
        <div class="text-center" v-else>
          No scores have been recorded yet.
        </div>
      </template>
  
      <template #nav>
        <MarkerButton
          to="/"
        >
          &lt; Home
        </MarkerButton>
      </template>
    </BasicLayout>
  </div>
</template>