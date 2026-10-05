import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/src/views/Home.vue';
import Login from '/src/views/Login.vue';
import About from '/src/views/About.vue';
import Prizes from '/src/views/Prizes.vue';

import RythemGameScene from '/src/views/Game/RythemGameScene.vue';
import PinballScene from '/src/views/Game/PinballScene.vue';
import dayjs from 'dayjs';

const isEnd = dayjs().diff('2021-11-22 10:59:59', 'second') > 0;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/prizes',
    name: 'Prizes',
    component: Prizes,
  },
  {
    path: '/game/rythem-game',
    name: 'RythemGameScene',
    component: RythemGameScene,
  },
  {
    path: '/game/pinball',
    name: 'PinballScene',
    component: PinballScene,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
];
const router = createRouter({
  // GitHub Pages 沒有 SPA fallback，改用 hash 路由
  history: createWebHashHistory(),
  routes
});
export default router;
