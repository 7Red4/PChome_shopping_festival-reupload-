<template>
  <div class="paddel paddel_left" :class="{ lift: isLeftPaddleUp }">
    <img :src="paddel" />
  </div>

  <div class="paddel paddel_right" :class="{ lift: isRightPaddleUp }">
    <img :src="paddel" />
  </div>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { onMounted, onUnmounted, watch, watchEffect } from '@vue/runtime-core';
import paddel from '../../assets/pinball/paddel.png';

const props = defineProps({
  isLeftPaddleUp: {
    type: Boolean,
    defalt: false
  },
  isRightPaddleUp: {
    type: Boolean,
    defalt: false
  },
})

// let ticker = null;

// const AValue = 5.4;
// const DValue = 3;
// const acc_left = ref(0);
// const acc_right = ref(0);

// const acc_increase = 0.6;
// const acc_increase_max = 5.8;

// const leftdeg = ref(42);
// const css_leftdeg = computed(() => `${leftdeg.value}deg`)
// const rightdeg = ref(-42);
// const css_rightdeg = computed(() => `${rightdeg.value}deg`)

// const judgingLeft = () => {
//   if (!props.isLeftPaddleUp) {
//     acc_left.value += acc_increase;
//     if (acc_left.value >= acc_increase_max) { acc_left.value = acc_increase_max };
//   } else {
//     acc_left.value = 0;
//   }

//   const _acc_left = AValue - acc_left.value
//   const result_l = DValue - _acc_left

//   leftdeg.value += result_l;

//   if (leftdeg.value > 42) { leftdeg.value = 42; return };
//   if (leftdeg.value < -36) { leftdeg.value = -36; return };
// }

// const judgingRight = () => {
//   if (!props.isRightPaddleUp) {
//     acc_right.value += acc_increase;
//     if (acc_right.value >= acc_increase_max) { acc_right.value = acc_increase_max };
//   } else {
//     acc_right.value = 0;
//   }

//   const _acc_right = AValue - acc_right.value
//   const result_r = DValue - _acc_right

//   rightdeg.value -= result_r;

//   if (rightdeg.value < -42) { rightdeg.value = -42; return };
//   if (rightdeg.value > 36) { rightdeg.value = 36; return };
// }


// onMounted(() => {
//   ticker = setInterval(() => {
//     judgingLeft()
//     judgingRight()
//   })
// })

// onUnmounted(() => {
//   clearInterval(ticker)
//   ticker = null;
// })

</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.paddel {
  position: absolute;

  width: 20%;
  top: 86.7%;
  z-index: 1;
}

$originX: 20%;
$normal_deg: 42deg;
$lift_deg: -36deg;

.paddel_left {
  left: 28%;
  transform: rotateZ($normal_deg);
  transform-origin: $originX 34%;
  transition: 0.17s;
  will-change: transform;

  &.lift {
    transform: rotateZ($lift_deg);
  }
}

.paddel_right {
  right: 28%;
  img {
    transform: rotateY(180deg);
  }

  transform: rotateZ(-$normal_deg);
  transform-origin: #{100% - $originX} 34%;
  transition: 0.1s;
  will-change: transform;

  &.lift {
    transform: rotateZ(-$lift_deg);
  }
}
</style>