<template>
  <div class="Track">
    <HtiBox
      v-for="({ duration, delay }, i) in track.notes"
      :ref="v => v && (HITBOXES[i] = v)"
      :key="`note${trackId}${i}`"
      :color="track.color"
      :duration="duration"
      :noteDelay="delay"
      :songDuration="songDuration"
      :class="{ 'no-pointer-event': currentIdx !== i, 'not-load': currentIdx > i }"
      :isPause="isPause"
      @miss="handleMiss(i)"
      @judge="judge"
    />

    <div class="score">
      <div
        class="score_add_hint"
        v-for="(s, i) in scores"
        :key="`score_add_hint:${i}`"
        :style="{ color: s.color, fontSize: s.fontSize }"
      >{{ s.text }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { onBeforeUpdate, watch } from '@vue/runtime-core';
import HtiBox from './HtiBox.vue';

const props = defineProps({
  trackId: {
    type: Number,
    default: 0
  },
  track: {
    type: Object,
    default: () => ({
      notes: []
    })
  },
  color: {
    type: String,
    default: ''
  },
  songDuration: {
    type: Number,
    default: 0
  },
  startTime: {
    type: Number,
    default: Date.now()
  },
  isPause: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['score', 'hit']);

const scores = ref([]);

const HITBOXES = ref([]);
onBeforeUpdate(() => {
  HITBOXES.value = []
})
let tickerConut = 0;
let ticker = null;

const stopTick = () => {
  clearInterval(ticker);
  ticker = null;
}

const scoreCount = {
  perfect: 3000,
  good: 1000,
  ok: 500,
  miss: 0
};

const scoreColor = {
  perfect: 'rgb(255, 223, 42)',
  good: 'rgb(42, 141, 255)',
  ok: 'rgb(114, 221, 132)',
  miss: 'rgb(236, 89, 89)'
};

let currentIdx = ref(0);

const handleMiss = (i) => {
  if (i === currentIdx.value) {
    hitJudgement.value = 'miss';
    currentIdx.value++;
  }
};

let hitJudgement = ref('');
watch(
  () => currentIdx.value,
  () => {
    const j = hitJudgement.value
    scores.value.push({
      text: `${j}${!!scoreCount[j] ? ` + ${scoreCount[j]}` : ''}`,
      color: scoreColor[j],
      fontSize: !!scoreCount[j] ? '1rem' : '1.7rem'
    });
    emit('hit', hitJudgement.value);
  }
);

const judge = (v) => {
  hitJudgement.value = v;
  emit('score', scoreCount[v]);
  currentIdx.value++;
}
</script>

<style lang="scss" scoped>
.Track {
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  perspective: 20px;
}

.score {
  position: absolute;
  top: 90%;
  left: 50%;
  transform-origin: 50% 100%;
  transform: rotateX(0deg);

  .score_add_hint {
    opacity: 0;
    position: absolute;
    top: -50%;
    left: 50%;
    text-shadow: 2px 2px 2px #fff;

    transform: translateX(-50%) translateY(0);

    animation: fade_up 2.5s;
    @keyframes fade_up {
      0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-100%);
      }
    }
  }
}
</style>
