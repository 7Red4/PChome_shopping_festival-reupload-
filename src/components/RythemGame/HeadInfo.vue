<template>
  <div class="pos-a z-index-4 game-font">
    <img :src="HeadInfoFrame" />
    <img
      v-if="!store.getters.getFace"
      src="../../assets/main/coin_spin.gif"
      class="coin_spin"
    />
    <div v-else class="coin">
      <CoinRenderer
        :face="previewImage || store.getters.getFace"
        :size="400"
        to2D
      />
    </div>

    <div class="name_light">
      <img :src="name_light_on" class="pos-a on" />
      <img :src="name_light_off" class="pos-a off" />
      <span>{{ name }}</span>
    </div>

    <div
      class="life_hint"
      :class="{ 'flash': isDamged }"
      @animationend="onDamageEnd"
    >
      <img :src="life_hint" />
    </div>

    <div class="score">
      {{ score }}
      <div
        class="score_add_hint"
        v-for="(s, i) in scores"
        :key="`score_add_hint:${i}`"
      >{{ s }}</div>
    </div>

    <div class="life_bar">
      <img
        v-for="i in life"
        :src="coinball"
        class="life"
        :class="`life${i}`"
        :key="`life${i}`"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';

import HeadInfoFrame from '../../assets/rythemGame/HeadInfo.png'
import name_light_on from '../../assets/rythemGame/name_light_on.png'
import name_light_off from '../../assets/rythemGame/name_light_off.png'
import life_hint from '../../assets/rythemGame/life_hint.png'
import coinball from '../../assets/coinball.png';
import { watch, watchEffect } from '@vue/runtime-core';
import { useStore } from 'vuex';
import CoinRenderer from '../CoinRenderer.vue';
const previewImage = window.coinImage;

const props = defineProps({
  score: {
    type: Number,
    default: 0
  },
  high: {
    type: Boolean,
    default: false
  },
  life: {
    type: Number,
    default: 0
  }
})

const store = useStore();
const name = computed(() => store.getters.getName)

const scores = ref([])

watch(() => props.score,
  (v, ov) => {
    if (v - ov > 0) scores.value.push(v - ov);
  }
)

const isDamged = ref(false)
const onDamageEnd = () => {
  isDamged.value = false
}

watch(
  () => props.life,
  () => {
    isDamged.value = true
  })

</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.coin_spin {
  position: absolute;
  width: 13%;
  top: 7.5%;
  left: 14.5%;
}

.coin {
  position: absolute;
  width: 13.5%;
  top: 7.5%;
  left: 13.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  will-change: transform;
  perspective: 20px;

  animation: shake 3s infinite;
  @keyframes shake {
    0%,
    100% {
      transform: rotateY(0deg);
    }
    25% {
      transform: rotateY(40deg);
    }
    75% {
      transform: rotateY(-40deg);
    }
  }
}

.name_light {
  position: absolute;
  width: 66%;
  top: 6%;
  left: 24%;
  .on {
    animation: breeth 4s infinite;
  }
  .off {
    animation: breeth_reverse 4s infinite;
  }

  span {
    color: #fff;
    font-weight: 700;
    z-index: 2;
    font-size: 24px;

    position: absolute;
    left: 50%;
    transform: translate(-50%, 55%);
  }
}

.score {
  position: absolute;
  top: 66%;
  right: 68%;
  font-size: 1.44rem;

  .score_add_hint {
    opacity: 0;
    position: absolute;
    top: -50%;
    left: 50%;

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

.life_hint {
  position: absolute;
  width: 12%;
  top: 30%;
  left: 86%;

  &.flash {
    animation: flash 1s;
    @keyframes flash {
      0%,
      50%,
      100% {
        opacity: 1;
      }
      25%,
      75% {
        opacity: 0;
      }
    }
  }
}

.life_bar {
  position: absolute;
  width: 40%;
  top: 64%;
  left: 60%;

  .life {
    position: absolute;
    width: 14%;
    top: 24%;
  }

  .life1 {
    left: 4%;
  }
  .life2 {
    left: 23%;
  }
  .life3 {
    left: 43%;
  }
  .life4 {
    left: 62.5%;
  }
  .life5 {
    left: 82%;
  }
}
</style>