<script setup lang="ts">
import BasicLayout from '@/components/BasicLayout/BasicLayout.vue';
import InstructionItem from '@/components/InstructionItem/InstructionItem.vue';
import ContentBox from '@/components/ContentBox/ContentBox.vue';
import MarkerButton from '@/components/MarkerButton/MarkerButton.vue';
</script>

<template>
  <BasicLayout>
    <template #title>
      Instructions
    </template>

    <template #content>
      <ContentBox class="my-4 flex flex-col gap-4">
        <div class="mt-4">
          Control the cat by moving the pointer around the game screen. Try to avoid as many falling cucumbers as you can to get the highest score.
        </div>
    
        <InstructionItem>
          <template #item>
            <span class="uppercase">
              · Cucumber:
            </span>
            <img class="h-8" src="/images/cucumber_btn.png" alt="cucumber">
          </template>
  
          <template #description>
            Have i not been clear? Avoid these at all costs.
          </template>
        </InstructionItem>
  
        <InstructionItem>
          <template #item>
            <span class="uppercase">
              · Tuna can:
            </span>
            <img class="h-8" src="/images/tuna_can.png" alt="tuna can">
          </template>
  
          <template #description>
            You'll love it. Eating tuna grants you extra lives.
          </template>
        </InstructionItem>
  
        <InstructionItem>
          <template #item>
            <span class="uppercase">
              · Yarn ball:
            </span>
            <img class="h-8" src="/images/gravity_ball.png" alt="gravity ball">
          </template>
  
          <template #description>
            How can a cat resist a ball of yarn? Yarn balls grant you a bunch of points, but they somehow distort the way cucumbers behave. Dare to try?
          </template>
        </InstructionItem>
      </ContentBox>
    </template>

    <template #nav>
      <MarkerButton
        to="/"
      >
        &lt; Home
      </MarkerButton>
    </template>
  </BasicLayout>
</template>