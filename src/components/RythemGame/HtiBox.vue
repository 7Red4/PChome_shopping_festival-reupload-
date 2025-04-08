<template>
  <div class="hit-box" @touchstart.prevent="judge">
    <img src="../../assets/rythemGame/note.png" class="coinball w100p" />
  </div>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';

const props = defineProps({
  color: {
    type: String,
    default: '#ffa'
  },
  noteDuration: {
    type: Number,
    default: 3
  },
  noteDelay: {
    type: Number,
    default: -1
  },
  songDuration: {
    type: Number,
    default: 0
  },
  isPause: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['judge', 'miss']);

const display = ref(false);
const css_display = computed(() => display.value ? 'block' : 'none')
const top = ref(0);
const css_top = computed(() => `${top.value}%`)
const delayOffset = 500; // ms
const duration = props.noteDuration * 1000; // ms
let preTickerConut = 0;
let preTicker = null;
let tickerConut = 0;
let ticker = null;

const stopTick = () => {
  clearInterval(ticker);
  ticker = null;
  display.value = false;
}

const stopPreTick = () => {
  clearInterval(preTicker);
  preTicker = null;
}

const startAnimate = () => {
  ticker = setInterval(() => {
    if (props.isPause) return;
    tickerConut += 20;
    top.value = tickerConut * 100 / duration;

    if (tickerConut >= duration + delayOffset) {
      stopTick();
      emitMiss();
    }
  }, 20);
}

preTickerConut += 20;

const insideTicker = () => {
  if (props.isPause) return;
  preTickerConut += 20;
  if (preTickerConut >= props.noteDelay * 1000) {
    display.value = true;
    startAnimate();
    stopPreTick();
  }
}

preTicker = setInterval(() => {
  insideTicker();
}, 20)

const emitMiss = () => {
  setTimeout(() => {
    emit('miss');
  }, 60);
};

onUnmounted(() => {
  stopPreTick()
  stopTick()
})

const judge = () => {
  if (tickerConut < 3000 * 3 / 4) return;

  const judgeResult = getHitJudgement(Math.abs(3000 - tickerConut));
  emit('judge', judgeResult)
}

const getHitJudgement = function (accuracy) {
  if (accuracy < delayOffset - 400) {
    return 'perfect';
  } else if (accuracy < delayOffset - 300) {
    return 'good';
  } else if (accuracy < delayOffset) {
    return 'ok';
  } else {
    return 'miss';
  }
};
</script>

<style lang="scss" scoped>
.hit-box {
  position: absolute;
  height: 100%;
  flex-grow: 1;
  width: 100%;
  z-index: 3;
  // background-color: v-bind(color);
  display: v-bind(css_display);
  will-change: transform;

  transform: translateY(v-bind(css_top));
}

.coinball {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%) scaleY(0.5);
}
</style>
