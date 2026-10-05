<template>
  <div class="pos-r d-flex flex-column align--center">
    <img :src="`${BASE_URL}main_visual.png`" class="w100p" />
    <img src="../assets/main/prize_switch.png" class="prize_switch" />
    <img
      src="../assets/main/start_expirence.png"
      class="start_btn"
      @click="handleStart"
    />
    <SizeBox height="48" />
    <PrizeBox />
    <SizeBox height="48" />
    <Sponsors />

    <SizeBox height="48" />
    <div class="hint">
      <p>建議使用Google Chrome 瀏覽器</p>
      <p>以獲得最佳瀏覽體驗</p>
    </div>
    <SizeBox height="48" />

    <SizeBox height="76" />
  </div>

  <Teleport to="body">
    <div
      v-if="showingAccessibility"
      style="width: 100vw; height: 100vh;"
      class="overlay flex-center z-index-9"
    >
      <div style="width: 100%;max-width: 600px;" class="flex-center">
        <h1 style="font-size: 64px; color: #fff; width: 100%; text-align: center;">請使用手機裝置大小</h1>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import SizeBox from '../components/SizeBox.vue';
import PrizeBox from '../components/PrizeBox.vue';
import Sponsors from '../components/Sponsors.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { inject, watch } from '@vue/runtime-core';

const BASE_URL = import.meta.env.BASE_URL;
const store = useStore();
const router = useRouter();

const showingAccessibility = ref(false);
const isEnd = dayjs().diff('2021-11-22 10:59:59', 'second') > 0;
const windowWidth = inject('windowWidth');
showingAccessibility.value = windowWidth.value > 600;

watch(() => windowWidth.value, (v) => {
  showingAccessibility.value = v > 600;
})

const handleStart = () => {
  router.push('/game/pinball');
}
</script>


<style lang="scss" scoped>
.overlay {
  position: fixed;
  background-color: #0a0a0acd;
  top: 0;
  left: 0;
}
.prize_switch {
  position: absolute;
  top: 32%;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
}

.start_btn {
  position: absolute;
  top: 27.2%;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
  pointer-events: all;
}

.hint {
  color: #b0b0b0;
  font-weight: normal;
  line-height: 1.37;
  text-align: center;
}

.notice_board {
  position: absolute;
  top: 82%;
  left: 50%;
  transform: translateX(-50%);
  height: 10%;
  width: 58%;
  opacity: 0;
}
</style>