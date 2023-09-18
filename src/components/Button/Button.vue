<script setup lang="ts">
defineProps<{
  disabled?: boolean,
}>();
</script>

<template>
  <div
    :class="[
      'basic-button cursor-pointer border border-neutral-100 hover:bg-neutral-200 hover:text-neutral-900 transition-colors duration-200 py-1 px-2 rounded',
      { 'hover:shadow-lime-300': !disabled },
      { disabled }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
  .basic-button.disabled {
    @apply opacity-50 pointer-events-none;
  }
</style>