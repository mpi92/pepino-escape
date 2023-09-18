<script setup lang="ts">
import usePlayerState from '@/utils/usePlayerState';
import BasicLayout from '@/components/BasicLayout/BasicLayout.vue';
import MarkerButton from '@/components/MarkerButton/MarkerButton.vue';
import Button from '@/components/Button/Button.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { playerName, setPlayerName } = usePlayerState();

const showEditPlayerNameModal = ref(false);
const playerNameInput = ref(playerName.value);

function startGame() {
  router.push('/game');
}

function handlePlayButton() {
  if (!playerNameInput.value) {
    showEditPlayerNameModal.value = true;
    return;
  }

  startGame();
}

function handleSubmitName() {
  showEditPlayerNameModal.value = false;
  setPlayerName(playerNameInput.value);
  startGame();
}

function handleCloseModal() {
  showEditPlayerNameModal.value = false;
  playerNameInput.value = '';
}
</script>

<template>
  <div class="relative w-full h-full">
    <BasicLayout>
      <template #title>
        <span class="text-[3.5rem] whitespace-nowrap">
          PEPINO ESCAPE
        </span>
      </template>
  
      <template #content>
        <div class="flex flex-col items-center text-xl gap-4">
          <MarkerButton
            show-bullets
            @click="handlePlayButton"
          >
            Play
          </MarkerButton>
  
          <MarkerButton
            show-bullets
            to="/settings"
            disabled
          >
            Settings
          </MarkerButton>
  
          <MarkerButton
            show-bullets
            to="/instructions"
          >
            Instructions
          </MarkerButton>
  
          <MarkerButton
            show-bullets
            to="/scores"
          >
            Scores
          </MarkerButton>
        </div>
      </template>
    </BasicLayout>
  
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        class="absolute top-0 wrapper bg-neutral-900/90 z-10"
        v-if="showEditPlayerNameModal"
      >
        <div class="border border-neutral-800 bg-[#14532d] rounded p-10 max-w-[30rem]">
          <div class="w-full">
            <p class="text-lg">
              Please enter your name
            </p>
            <p class="text-sm mt-2">
              (Don't worry, you can be change it later in the settings menu)
            </p>
          </div>
    
          <input
            v-model="playerNameInput"
            class="w-full focus:outline-none rounded px-1 border border-neutral-900 mt-4 bg-neutral-700 text-lg"
            type="text"
            @keyup.enter="handleSubmitName"
          >
    
          <div class="flex items-center justify-between mt-8">
            <Button
              @click="handleCloseModal"
            >
              Cancel
            </Button>

            <Button
              :disabled="!playerNameInput"
              @click="handleSubmitName"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
