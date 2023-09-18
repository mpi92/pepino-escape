<template>
  <div class="py-2">
    <div class="flex items-center gap-2">
      <div class="text-base flex items-center gap-4">
        <slot name="item" />
      </div>
    </div>
    <div class="italic text-sm">
      <slot name="description" />
    </div>
  </div>
</template>