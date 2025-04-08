<template>
  <div class="gaming_header game-font d-flex justify--space-between px-2 pt-2">
    <div></div>

    <div>
      <va-button
        v-if="isPlay && musicStartPlay"
        class="z-index-5"
        @click="isPause = !isPause"
        :icon="isPause ? 'play_arrow' : 'pause'"
        color="#fff"
      ></va-button>

      <SizeBox width="8" inline />

      <va-button
        class="z-index-5"
        @click="toggleMute"
        :icon="muted ? 'volume_off' : 'volume_up'"
        color="#fff"
      ></va-button>
    </div>
  </div>

  <div class="game-font overflow-hidden">
    <img
      v-if="!isHigh"
      src="../../assets/rythemGame/main_bg.png"
      class="w100p h100p pos-a t0 l0"
    />
    <img
      v-else
      src="../../assets/rythemGame/main_bg_high.png"
      class="w100p h100p pos-a t0 l0"
    />
    <HeadInfo :score="gameInfo.score" :life="notRecover ? 0 : life" />
    <SizeBox height="30.3vw" />

    <RythemGame
      @update="updateGameInfo"
      @hit="handleHit"
      @SFX-ready="isSFXReady = true"
      :isPlay="isPlay"
      :isPause="isPause"
    />

    <Contents />

    <Teleport to="body">
      <div
        v-if="!isPlay && !isEnd"
        class="befor_start flex-center"
        @click="test"
      >
        <va-button
          @click="startGame"
          :loading="!isMusicReady || !isSFXReady"
        >START</va-button>
      </div>
    </Teleport>
  </div>

  <div v-if="!life || isEnd" class="end_frame">
    <img src="../../assets/main/ui/congrats.png" />
    <va-button class="action" to="/prizes"></va-button>
  </div>

  <div
    v-if="tutorialPage < 3"
    class="tutorial"
    :class="`tutorial${tutorialPage}`"
  >
    <img
      v-if="tutorialPage === 1"
      src="../../assets/tutorial/next.png"
      class="next"
      @click="tutorialPage++"
    />
    <img
      v-if="tutorialPage === 2"
      src="../../assets/tutorial/start.png"
      class="start"
      @click="tutorialPage++"
    />

    <va-button class="skip" @click="tutorialPage = 3" icon="close" color="#fff"></va-button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from '@vue/reactivity';
import { inject, nextTick, onMounted, onUnmounted, watch, watchEffect } from '@vue/runtime-core';
import RythemGame from '../../components/RythemGame/index.vue';
import HeadInfo from '../../components/RythemGame/HeadInfo.vue';
import Contents from '../../components/RythemGame/Contents.vue';

import MUSIC from '../../assets/rythemGame/ELECTRIC-WIND_.mp3';
import HIT from '../../assets/SFX/rythem/hit.ogg';
import HIT_ from '../../assets/SFX/rythem/hit.mp3';
import { Howl } from 'howler';
import api from '../../api';
import { useStore } from 'vuex';
const store = useStore();

const gameInfo = reactive({
  combo: 0,
  maxCombo: 0,
  score: 0,
  startTime: null,
  comboText: null
});

const isMusicReady = ref(false);
const RYTHEM_BG_MUSIC = new Howl({
  src: [MUSIC],
  onload: (v) => {
    isMusicReady.value = true;
  },
  onend: () => {
    showResult();
  }
})

const isSFXReady = ref(false);
const SFX = new Howl({
  src: [HIT, HIT_],
  onload: () => {
    isSFXReady.value = true;
  }
});

const isLeaveWarning = inject('isLeaveWarning')
watch(
  () => isLeaveWarning.value,
  (v) => {
    v && (isPause.value = true);
  })

const isPlay = ref(false);
const isPause = ref(false);
const isEnd = ref(false);
const muted = ref(false);
const musicStartPlay = ref(false);
const life = ref(5);
const parsedLife = computed(() => Math.ceil(life.value / 4))
const tutorialPage = ref(1);
const isHigh = computed(() => gameInfo.score > 50000);
const scoreRecord = computed(() => store.getters.getScore('rythem'));
const notRecover = computed(() => scoreRecord.value.updatedAt ? dayjs().diff(scoreRecord.value.updatedAt, 'hour') < 1 : false);

watch(() => notRecover.value, () => {
  checkRecover();
})

const checkRecover = () => {
  if (notRecover.value) {
    isEnd.value = true;
    tutorialPage.value = 3;
    window.rytemNotRecover = true;
  } else {
    window.rytemNotRecover = false;
  }
}

const toggleMute = () => {
  muted.value = !muted.value;
  RYTHEM_BG_MUSIC.mute(muted.value)
}

watch(
  () => isPause.value,
  (v) => {
    if (v) {
      RYTHEM_BG_MUSIC.pause();
    } else {
      RYTHEM_BG_MUSIC.play();
    }
  }
)

watch(
  () => life.value,
  (v) => {
    if (!v || v <= 0 && !isEnd.value) {
      showResult();
      // alert('遊戲結束');
    }
  }
)

const startGame = () => {
  isPlay.value = true;
  window.scrollTo(0, 100);

  RYTHEM_BG_MUSIC.play();
  musicStartPlay.value = true;
};

const handleHit = (v) => {
  v !== 'miss' && SFX.play();
  v === 'miss' && life.value--;
}

const updateGameInfo = (e) => {
  Object.keys(e).forEach((key) => {
    gameInfo[key] = e[key];
  });
};

const showResult = async () => {
  isPause.value = true;
  isEnd.value = true;
  RYTHEM_BG_MUSIC.stop();

  const { res, error } = await api('/score', {
    email: store.getters.getEmail,
    type: 'rythem',
    score: gameInfo.score
  })

  store.dispatch('GET_USER');
};

onMounted(() => {
  checkRecover();
  RYTHEM_BG_MUSIC.load();
  SFX.load();
})

onUnmounted(() => {
  RYTHEM_BG_MUSIC.unload();
  SFX.unload();
})
</script>

<style lang="scss" scoped>
.gaming_header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  z-index: 9;
}

.no_padding {
  &::v-deep(.va-button__content) {
    padding: 0 !important;
  }
}

.score_display {
  position: absolute;
  top: 135px;
  left: 60px;

  color: #fff;
  font-weight: bold;
  font-size: 32px;
}

.befor_start {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background-color: #000000aa;
  z-index: 4;
}

.end_frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000aa;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
  }

  .action {
    position: absolute;
    top: 51%;
    width: 42%;
    height: 7%;
    opacity: 0;
  }
}

.tutorial {
  z-index: 11;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #000;

  &.tutorial1 {
    background-image: url("../../assets/tutorial/music_tutorial1.jpg");
  }

  &.tutorial2 {
    background-image: url("../../assets/tutorial/music_tutorial2.jpg");
  }

  .next {
    position: absolute;
    width: 50%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .start {
    position: absolute;
    width: 50%;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .skip {
    pointer-events: all;
    position: absolute;
    right: 6px;
    top: 8px;
  }
}
</style>
