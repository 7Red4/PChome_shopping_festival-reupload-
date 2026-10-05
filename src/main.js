import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import 'vuestic-ui/dist/vuestic-ui.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import dayjs from 'dayjs';
import { Howl } from 'howler';
import { ref } from '@vue/reactivity';

import './scss/main.scss';
import './scss/utils.scss';

import App from './App.vue';

import SizeBox from './components/SizeBox.vue';

import router from './router/index';
import store from './store/index';

import MUSIC from './assets/pinball/CAPPED.mp3'
import LAUNCH from './assets/SFX/pinball/launch.mp3'
import SCORE from './assets/SFX/pinball/score.mp3'
import TRIGGER from './assets/SFX/pinball/_trigger.mp3'

window.musicAssetsLoadCount = ref(0);

window.PINBALL_BG_MUSIC = new Howl({
  src: [MUSIC],
  loop: true,
  onload: (v) => {
    window.musicAssetsLoadCount.value++;
  }
});

window.SFX_LAUNCH = new Howl({
  src: [LAUNCH],
  onload: () => {
    window.musicAssetsLoadCount.value++;
  }
});

window.SFX_SCORE = new Howl({
  src: [SCORE],
  onload: () => {
    window.musicAssetsLoadCount.value++;
  }
});

window.SFX_TRIGGER = new Howl({
  src: [TRIGGER],
  onload: () => {
    window.musicAssetsLoadCount.value++;
  }
});

window.dayjs = dayjs;
window.isChange = dayjs().diff('2021-11-14 10:59:00', 'second') > 0;
// window.isChange = true;

// 桌機手機框模式下，外層頁面只負責顯示 iframe，不掛載 app
!window.__PHONE_FRAME__ && (async () => {
  await store.dispatch('GET_USER');

  const app = createApp(App);

  app.provide('BABYLON', BABYLON);

  app.use(VuesticPlugin, {
    colors: {
      primary: '#27A2F8'
    }
  });
  app.use(router);
  app.use(store);

  app.component('SizeBox', SizeBox);

  app.mount('#app');
})()
