<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex flex-col items-center w-[30rem] justify-between h-full max-h-[40rem]">
      <div class="text-center text-2xl font-bungee">
        <slot name="title" />
      </div>
  
      <slot name="content" />
  
      <div
        class="w-full flex items-center gap-10 justify-between"
      >
        <slot name="nav" />
      </div>
    </div>
  </div>
</template>