/* eslint-disable import/no-dynamic-requireAsset */
/* eslint-disable global-requireAsset */

import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home.vue'),
  },
  {
    path: '/instructions',
    name: 'instructions',
    component: () => import('@/views/Instructions/Instructions.vue'),
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/Game/Game.vue'),
  },
  {
    path: '/scores',
    name: 'scores',
    component: () => import('@/views/Scores/Scores.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
