<template>
  <div id="RYTHEM_GAME_CONTAINER">
    <img :src="base" :class="isHigh ? ['not-load', 'pos-a'] : null" />
    <img :src="base_high" :class="!isHigh ? ['not-load', 'pos-a'] : null" />
    <TrackAssets :isHigh="isHigh" />
    <img :src="coin_spin" class="coin_spin" />
    <div v-if="isPlay" class="trackWrapper" :class="{ showTracks }">
      <template v-for="(track, i) in song.sheet" :key="`track${i + 1}`">
        <Track
          :track-id="i + 1"
          :track="track"
          :song-duration="song.duration"
          :isPause="isPause"
          @score="updateScore"
          @hit="(v) => { hits.push(v); $emit('hit', v) }"
        />
      </template>
    </div>

    <div
      class="hit_display bounce no-pointer-event"
      v-for="(hit, i) in hits"
      :class="i === hits.length - 1 ? null : 'not-load'"
      :key="`hit${i}`"
    >
      <div class="hit_text">{{ hit }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RythemGame'
};
</script> 

<script setup>
import { computed, reactive, ref } from '@vue/reactivity';
import { nextTick, onMounted, watch, watchEffect } from '@vue/runtime-core';
import { song } from './song';
import Track from './Track.vue';
import TrackAssets from './TrackAssets.vue';

import base from '../../assets/rythemGame/base.png'
import base_high from '../../assets/rythemGame/base_high.png'
import coin_spin from '../../assets/main/coin_spin.gif'


onMounted(() => {
  // SFX.value.load();
})

const showTracks = false;

const props = defineProps({
  startTime: {
    type: Number,
    default: 0
  },
  isPlay: {
    type: Boolean,
    default: false
  },
  isPause: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update', 'hit', 'SFX-ready']);
// watch(() => isSFXReady.value, () => emit('SFX-ready'))

const hits = ref(['']);

const multiplier = reactive({
  perfect: 1,
  good: 0.8,
  bad: 0.5,
  miss: 0,
  combo40: 1.05,
  combo80: 1.1
});

const gameInfo = reactive({
  combo: 0,
  maxCombo: 0,
  score: 0,
  startTime: null,
  comboText: null
});
const isHigh = computed(() => gameInfo.score > 50000);

const updateScore = (v) => {
  // SFX.value.currentTime = 0;
  // SFX.value.play();
  gameInfo.score += v;
};

nextTick(() => {
  watchEffect(() => {
    emit('update', gameInfo);
  });
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.coin_spin {
  position: absolute;
  width: 35%;
  top: 4.7%;
  left: 32%;
}

#RYTHEM_GAME_CONTAINER {
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  perspective: 100px;

  overflow: hidden;
  bottom: 0;
}
.trackWrapper {
  position: absolute;
  &.showTracks {
    background: rgb(53, 53, 53, 12);
  }

  width: 620px;
  max-width: 100%;

  height: 110%;

  position: absolute;
  left: 50%;
  bottom: 9%;

  transform-origin: 50% 100%;
  transform: translateX(-50%) rotateX(22deg);

  display: flex;
}
.divider {
  height: 100%;
  width: 1px;
  background-color: #fff;
}

.hit_display {
  position: absolute;
  top: 29%;
  left: 50%;
  transform: translate(-50%, -50%);

  .hit_text {
    opacity: 0;
    transform: scale(1.2);
  }

  &.bounce {
    .hit_text {
      animation: bounce 0.7s;
      animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
      will-change: transform opacity;
    }
  }
}

@keyframes bounce {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  10% {
    transform: scale(1.1);
  }
  64% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
