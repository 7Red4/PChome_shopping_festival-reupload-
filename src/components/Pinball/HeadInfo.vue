<template>
  <Teleport to="body">
    <div class="head_info game-font" ref="HEAD_INFO">
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

      <img :src="nameboard" style="width: 100vw; height: 20vw;" />
      <div class="nameboard_L_light">
        <template v-if="!high">
          <img :src="nameboard_L_light_on" class="pos-a on" />
          <img :src="nameboard_L_light_off" class="pos-a off" />
        </template>
        <img v-else :src="nameboard_L_light_high" class="pos-a" />
      </div>
      <div class="name_coin">
        <template v-if="!high">
          <img :src="name_coin_on" />
        </template>
        <img v-else :src="name_coin_high" />
        <span>{{ name }}</span>
      </div>
      <div class="nameboard_R_light">
        <template v-if="!high">
          <img :src="nameboard_R_light_on" class="pos-a on" />
          <img :src="nameboard_R_light_off" class="pos-a off" />
        </template>
        <img v-else :src="nameboard_R_light_high" class="pos-a" />
      </div>

      <div class="score_board flex-center">
        <img :src="score_board" />
        <span class="score pos-a">{{ score }}</span>
      </div>

      <div class="life_bar">
        <img :src="life_bar" @load="setHeight" />
        <img
          v-for="i in life"
          :src="coinball"
          class="life"
          :class="`life${i}`"
          :key="`life${i}`"
        />
      </div>

      <div class="life_light">
        <img :src="life_light_on" class="pos-a on" />
        <img :src="life_light_off" class="pos-a off" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';

import nameboard from '../../assets/pinball/header/nameboard.png'
import name_coin_on from '../../assets/pinball/header/name_coin_on.png'
import nameboard_L_light_on from '../../assets/pinball/header/nameboard_L_light_on.png'
import nameboard_L_light_off from '../../assets/pinball/header/nameboard_L_light_off.png'
import nameboard_R_light_on from '../../assets/pinball/header/nameboard_R_light_on.png'
import nameboard_R_light_off from '../../assets/pinball/header/nameboard_R_light_off.png'
import life_light_on from '../../assets/pinball/header/life_light_on.png'
import life_light_off from '../../assets/pinball/header/life_light_off.png'

import name_coin_high from '../../assets/pinball/header/name_coin_high.png'
import nameboard_L_light_high from '../../assets/pinball/header/nameboard_L_light_high.png'
import nameboard_R_light_high from '../../assets/pinball/header/nameboard_R_light_high.png'

import coinball from '../../assets/coinball.png';

import score_board from '../../assets/pinball/header/score_board.png'
import life_bar from '../../assets/pinball/header/life_bar.png'
import { onMounted } from '@vue/runtime-core'
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
const name = computed(() => store.getters.getName);

const HEAD_INFO = ref({});
const fullHeight = ref(0);
const height = ref(0);

const setHeight = (e) => {
  height.value = HEAD_INFO.value.clientHeight
  fullHeight.value = HEAD_INFO.value.clientHeight + document.querySelector('.life_bar').clientHeight;
}

onMounted(() => {
  //
})

defineExpose({
  height,
  fullHeight
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 </script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.coin_spin {
  position: absolute;
  width: 13%;
  top: 11%;
  left: 14%;
  z-index: 9;
}

.coin {
  position: absolute;
  width: 14%;
  top: 8.7%;
  left: 13.4%;
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

.head_info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  padding-bottom: 6%;
}

.nameboard_L_light {
  position: absolute;
  left: 0;
  top: 10%;
  width: 11.5%;
  .on {
    animation: breeth 4s infinite;
  }
  .off {
    animation: breeth_reverse 4s infinite;
  }
}

.nameboard_R_light {
  position: absolute;
  right: 0;
  top: 10%;
  width: 11.5%;
  .on {
    animation: breeth 4s infinite;
  }
  .off {
    animation: breeth_reverse 4s infinite;
  }
}

.name_coin {
  position: absolute;
  left: 12%;
  width: 80%;

  span {
    color: #fff;
    font-weight: 700;
    z-index: 2;
    font-size: 24px;

    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
  }
}

.score_board {
  position: absolute;
  top: 66%;
  width: 40%;

  .score {
    z-index: 1;
    color: black;
    right: 30%;
    top: 30%;

    font-size: 1.25rem;
  }
}

.life_bar {
  position: absolute;
  top: 77%;
  right: 0;
  width: 40%;

  .life {
    position: absolute;
    width: 16%;
    top: 24%;
  }

  .life1 {
    left: 4%;
  }
  .life2 {
    left: 23%;
  }
  .life3 {
    left: 42%;
  }
  .life4 {
    left: 61%;
  }
  .life5 {
    left: 80%;
  }
}

.life_light {
  position: absolute;
  top: 69.1%;
  left: 37%;
  width: 25%;
}
</style>