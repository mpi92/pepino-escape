<script setup lang="ts">
import { useRouter } from 'vue-router';

const emit = defineEmits(['click']);
const props = defineProps<{
  to?: string,
  disabled?: boolean,
  showBullets?: boolean,
}>();

const router = useRouter();

function handleClick() {
  if (props.disabled) {
    return;
  }

  if (props.to) {
    router.push(props.to);
    return;
  }

  emit('click');
}
</script>

<template>
  <div
    :class="[
      'marker-button cursor-pointer',
      { 'hover:shadow-lime-300': !disabled },
      { disabled, 'show-bullets': showBullets }
    ]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style scoped>
  .marker-button.disabled {
    @apply opacity-50 pointer-events-none;
  }
  .marker-button:not(.disabled) {
    transition: text-shadow 0.1s ease-in-out;
  }

  .marker-button:not(.disabled):hover {
    text-shadow: 0px 0px 5px #04e35d;
  }

  .marker-button.show-bullets:not(.disabled)::before,
  .marker-button.show-bullets:not(.disabled)::after {
    @apply opacity-0;
    transition: opacity 0.1s ease-in-out;
    content: '○';
  }

  .marker-button.show-bullets:not(.disabled):hover::before,
  .marker-button.show-bullets:not(.disabled):hover::after {
    @apply opacity-100;
  }
</style>