<script setup lang="ts">
const { innerWidth, innerHeight } = window;
const isMobile = 'touchstart' in window;
const supported = !isMobile && innerWidth >= 1000 && innerHeight >= 800;
</script>

<template>
    <div
      class="flex items-center justify-center w-screen h-screen text-neutral-100"
    >
    <div
      v-if="!supported"
      class="text-lg text-center p-10"
    >
      Sorry, this game is not supported on your device yet.
    </div>

    <div
      v-else
        class="bg-neutral-900/90 border border-[#14532d] rounded shadow-main shadow-2xl w-[1000px] h-[800px] box-content"
      >
      <RouterView
        v-slot="{ Component }"
      >
        <Transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
      </div>
    </div>
</template>
