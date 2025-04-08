<template>
  <div class="gaming_header game-font d-flex justify--space-between px-2 pt-2">
    <div></div>
    <div>
      <va-button
        v-if="isLoad"
        class="z-index-5"
        @click="toggleMute"
        :icon="muted ? 'volume_off' : 'volume_up'"
        color="#fff"
      ></va-button>
    </div>
  </div>

  <HeadInfo
    ref="HEAD_INFO"
    :high="isHigh"
    :score="currentScore"
    :life="life > 0 ? life : 0"
  />
  <Teleport to="body">
    <div v-if="!isLoad" class="placehoder fill-all flex-center">
      <va-button
        @click="load"
        size="large"
        :loading="musicAssetsLoadCount < 4"
      >START</va-button>
    </div>
  </Teleport>

  <div class="theme_wrapper game-font" :class="{ isEnd }">
    <SizeBox :height="headInfoHeight" />

    <div id="container" :class="{ placehoding: !isLoad, useAvailableH }">
      <!-- all game element inside this container -->
      <img
        :src="BG_board"
        class="BG_board"
        :class="isHigh ? ['not-load', 'pos-a'] : null"
      />
      <img
        :src="BG_board_high"
        class="BG_board"
        :class="!isHigh ? ['not-load', 'pos-a'] : null"
      />

      <div class="launch_pipe_light" :class="{ 'active': isPlaying }">
        <img src="../../assets/pinball/aisle-bottomLight_on.png" />
      </div>

      <div
        class="product topleft"
        :class="{ 'bounce': productBumpers.bumper1 }"
        @animationend="productBumpers.bumper1 = false"
      >
        <img :src="currentGets.length && currentGets[0].img" />
        <span class="point">+ {{ currentGets.length && currentGets[0].point }}</span>
      </div>
      <div
        class="product topright"
        :class="{ 'bounce': productBumpers.bumper2 }"
        @animationend="productBumpers.bumper2 = false"
      >
        <img :src="currentGets.length && currentGets[1].img" />
        <span class="point">+ {{ currentGets.length && currentGets[1].point }}</span>
      </div>
      <div
        class="product botleft"
        :class="{ 'bounce': productBumpers.bumper3 }"
        @animationend="productBumpers.bumper3 = false"
      >
        <img :src="currentGets.length && currentGets[2].img" />
        <span class="point">+ {{ currentGets.length && currentGets[2].point }}</span>
      </div>
      <div
        class="product botright"
        :class="{ 'bounce': productBumpers.bumper4 }"
        @animationend="productBumpers.bumper4 = false"
      >
        <img :src="currentGets.length && currentGets[3].img" />
        <span class="point">+ {{ currentGets.length && currentGets[3].point }}</span>
      </div>

      <PaddelContorlls
        :isLeftPaddleUp="isLeftPaddleUp"
        :isRightPaddleUp="isRightPaddleUp"
      />
      <Contents />
      <LightFrames :isHigh="isHigh" />

      <button
        class="trigger left-trigger flex-center"
        @mousedown="leftTriggerDown"
        @touchstart.prevent="leftTriggerDown"
        @mouseup="leftTriggerUp"
        @touchend="leftTriggerUp"
      >
        <img :src="isLeftPaddleUp ? button_on : button_off" />
      </button>
      <button
        class="trigger right-trigger flex-center"
        @mousedown="rightTriggerDown"
        @touchstart.prevent="rightTriggerDown"
        @mouseup="rightTriggerUp"
        @touchend="rightTriggerUp"
      >
        <img :src="isRightPaddleUp ? button_on : button_off" />
      </button>

      <button
        v-if="!isPlaying && isLoad"
        class="fire-trigger"
        @touchstart.prevent
        @touchend="launchPinball"
      ></button>
    </div>
  </div>

  <div class="d-none svgs">
    <dome class="SVG_DOME" />
    <hook_wall class="SVG_HOOK_WALL" />
  </div>

  <Teleport to="body">
    <div v-if="isEnd" class="end_frame">
      <img src="../../assets/main/ui/congrats.png" />
      <va-button class="action" to="/prizes"></va-button>
    </div>
  </Teleport>

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
import Matter from 'matter-js';
import MatterAttractors from 'matter-attractors';
import decomp from 'poly-decomp';
import 'pathseg';
import { nextTick, onMounted, onUnmounted, watch, watchEffect } from '@vue/runtime-core';
import { onBeforeRouteLeave } from 'vue-router';
import { computed, reactive, ref } from '@vue/reactivity';
import HeadInfo from '../../components/Pinball/HeadInfo.vue';
import LightFrames from '../../components/Pinball/LightFrames.vue';
import Contents from '../../components/Pinball/Contents.vue';
import PaddelContorlls from '../../components/Pinball/PaddelContorlls.vue';
import BG_board from '../../assets/pinball/BG_board.png'
import BG_board_high from '../../assets/pinball/BG_board_high.png'
import coinball from '../../assets/coinball.png';
import button_off from '../../assets/pinball/button_off.png';
import button_on from '../../assets/pinball/button_on.png';
import garmin from '../../assets/pinball/garmin.png';
import electrolux from '../../assets/pinball/electrolux.png';
import Mk from '../../assets/pinball/Mk.png';
import ns from '../../assets/pinball/ns.png';
import dome from '../../assets/pinball/wireframe/dome.svg';
import hook_wall from '../../assets/pinball/wireframe/hook_wall.svg';

import MUSIC from '../../assets/pinball/CAPPED.mp3'
import LAUNCH from '../../assets/SFX/pinball/launch.mp3'
import SCORE from '../../assets/SFX/pinball/score.mp3'
import TRIGGER from '../../assets/SFX/pinball/_trigger.mp3'

import { Howl } from 'howler';
import api from '../../api';
import { useStore } from 'vuex';

const store = useStore();

const musicAssetsLoadCount = window.musicAssetsLoadCount;
const muted = ref(false);

const toggleMute = () => {
  muted.value = !muted.value;
  window.PINBALL_BG_MUSIC.mute(muted.value)
}

window.decomp = decomp;

const life = ref(5);
const scoreRecord = computed(() => store.getters.getScore('pinball'));
const notRecover = computed(() => scoreRecord.value.updatedAt ? dayjs().diff(scoreRecord.value.updatedAt, 'hour') < 1 : false);

watch(() => notRecover.value, () => {
  checkRecover();
})

const checkRecover = () => {
  if (notRecover.value) {
    life.value = 0;
    tutorialPage.value = 3;
    window.pinballNotRecover = true;
    isEnd.value = true;
  } else {
    window.pinballNotRecover = false;
  }
}

// plugins
Matter.use(MatterAttractors);
const tutorialPage = ref(1);
watch(() => tutorialPage.value, () => {
  window.scrollTo(0, 10);
})
const HEAD_INFO = ref();
const headInfoHeight = computed(() => HEAD_INFO && HEAD_INFO.value && HEAD_INFO.value.height || 0);
// constants
const WIREFRAMES = false;
const SHOW_BLOCKKS = false;

const GRAVITY = 0.75;
const BUMPER_BOUNCE = 1.5;
const PADDLE_PULL = 0.002;
const MAX_VELOCITY = 42;

const isHigh = computed(() => currentScore.value >= 25000);

// shared variables
const currentScore = ref(0);
const highScore = ref(0);
const isLoad = ref(false);
const isPlaying = ref(false);

let engine, world, render, pinball, stopperGroup;
let leftUpStopper, leftDownStopper
let rightUpStopper, rightDownStopper
const isLeftPaddleUp = ref(false);
const isRightPaddleUp = ref(false);
const productBumpers = reactive({
  bumper1: false,
  bumper2: false,
  bumper3: false,
  bumper4: false,
})

const SVGS = {
  dome: null,
  hook_wall: null
};

function load() {
  isLoad.value = true;
  window.PINBALL_BG_MUSIC.volume = 0.2;

  window.PINBALL_BG_MUSIC.play();

  init();
  loadSVGS();
  createStaticBodies();
  createPaddles();
  createPinball();
  createEvents();
}

const loadSVGS = () => {
  SVGS.dome = document.querySelector('.SVG_DOME > path');
  SVGS.hook_wall = document.querySelector('.SVG_HOOK_WALL > path');
};

function init() {
  // engine (shared)
  engine = Matter.Engine.create();
  // engine.timming.timeScale = 1.2
  // world (shared)
  world = engine.world;
  world.bounds = {
    min: { x: 0, y: 0 },
    max: { x: 500, y: 800 }
  };
  world.gravity.y = GRAVITY; // simulate rolling on a slanted table

  // render (shared)
  render = Matter.Render.create({
    element: document.querySelector('#container'),
    engine: engine,
    options: {
      width: world.bounds.max.x,
      height: world.bounds.max.y,
      wireframes: WIREFRAMES,
      background: '#ffffff00'
    },
  });
  Matter.Render.run(render);

  // runner
  let runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  // used for collision filtering on various bodies
  stopperGroup = Matter.Body.nextGroup(true);

  // starting values
  currentScore.value = 0;
  highScore.value = 0;
  isLeftPaddleUp.value = false;
  isRightPaddleUp.value = false;
}

function createStaticBodies() {
  Matter.World.add(world, [
    // 球的放置為
    wall(460, 658, 60, 10,),

    // table boundaries
    boundary(250, -30, 500, 100), // top
    boundary(250, 830, 500, 100), // bot
    boundary(-30, 400, 145, 800), // left
    boundary(545, 400, 136, 800), // right

    wall(425, 520, 12, 620, ''),

    // dome
    pathFromSVG(363, 46, SVGS.dome),
    pathFromSVG(415, 168, SVGS.hook_wall),

    // 上方紅牆壁
    wall(202, 122, 10, 60,),
    wall(292, 122, 10, 60,),

    // 下方紅牆壁
    wall(173, 512, 10, 60,),
    wall(262, 512, 10, 60,),

    bumper(248, 283, 80), // 中心硬幣

    // 四個商品彈跳
    bumper(123, 189, 18, 'bumper1'), // 左上
    bumper(356, 189, 18, 'bumper2'), // 右上

    bumper(123, 424, 18, 'bumper3'), // 左下
    bumper(356, 424, 18, 'bumper4'), // 右下

    // j 形藍色擋板
    wall(332, 595, 6, 70, '', 0.8),
    wall(357, 525, 6, 86, ''),

    // 換商品開關
    wallBumper(91, 616, 6, 98, '', -0.8),

    // 翻動板旁兩側擋板
    wall(90, 640, 20, 165, '', -0.8),
    wall(389, 665, 20, 100, '', 0.85),

    // 球重置區域 
    reset(255, 500),
    reset(440, 60)
  ]);
}

function createPaddles() {
  const LOX = 12;
  const LOY = 48;

  const ROX = 33;
  const ROY = 48;
  // these bodies keep paddle swings contained, but allow the ball to pass through
  leftUpStopper = stopper(160 + LOX, 591 + LOY, 'left', 'up');
  leftDownStopper = stopper(140 + LOX, 743 + LOY, 'left', 'down');
  rightUpStopper = stopper(290 + ROX, 591 + ROY, 'right', 'up');
  rightDownStopper = stopper(310 + ROX, 743 + ROY, 'right', 'down');
  Matter.World.add(world, [
    leftUpStopper,
    leftDownStopper,
    rightUpStopper,
    rightDownStopper
  ]);

  // this group lets paddle pieces overlap each other
  let paddleGroup = Matter.Body.nextGroup(true);

  // Left paddle mechanism
  let paddleLeft = {};
  paddleLeft.paddle = Matter.Bodies.trapezoid(170, 660, 28, 96, 0.66, {
    label: 'paddleLeft',
    angle: 1.57,
    chamfer: {},
    render: {
      visible: SHOW_BLOCKKS
    }
  });
  paddleLeft.brick = Matter.Bodies.rectangle(172, 672, 40, 96, {
    angle: 1.62,
    chamfer: {},
    render: {
      visible: false
    }
  });
  paddleLeft.comp = Matter.Body.create({
    label: 'paddleLeftComp',
    parts: [paddleLeft.paddle, paddleLeft.brick]
  });
  paddleLeft.hinge = Matter.Bodies.circle(142 + LOX, 660 + LOY, 5, {
    isStatic: true,
    render: {
      visible: false
    }
  });
  Object.values(paddleLeft).forEach((piece) => {
    piece.collisionFilter.group = paddleGroup;
  });
  paddleLeft.con = Matter.Constraint.create({
    bodyA: paddleLeft.comp,
    pointA: { x: -29.5, y: -8.5 },
    bodyB: paddleLeft.hinge,
    length: 0,
    stiffness: 0
  });
  Matter.World.add(world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con]);
  Matter.Body.rotate(paddleLeft.comp, 0.57, { x: 142, y: 660 });

  // right paddle mechanism
  let paddleRight = {};
  paddleRight.paddle = Matter.Bodies.trapezoid(280, 660, 28, 96, 0.66, {
    label: 'paddleRight',
    angle: -1.57,
    chamfer: {},
    render: {
      visible: SHOW_BLOCKKS
    }
  });
  paddleRight.brick = Matter.Bodies.rectangle(278, 672, 40, 96, {
    angle: -1.62,
    chamfer: {},
    render: {
      visible: false
    }
  });
  paddleRight.comp = Matter.Body.create({
    label: 'paddleRightComp',
    parts: [paddleRight.paddle, paddleRight.brick]
  });
  paddleRight.hinge = Matter.Bodies.circle(308 + ROX, 660 + ROY, 5, {
    isStatic: true,
    render: {
      visible: false
    }
  });
  Object.values(paddleRight).forEach((piece) => {
    piece.collisionFilter.group = paddleGroup;
  });
  paddleRight.con = Matter.Constraint.create({
    bodyA: paddleRight.comp,
    pointA: { x: 29.5, y: -8.5 },
    bodyB: paddleRight.hinge,
    length: 0,
    stiffness: 0
  });
  Matter.World.add(world, [paddleRight.comp, paddleRight.hinge, paddleRight.con]);
  Matter.Body.rotate(paddleRight.comp, -0.57, { x: 308, y: 660 });
}

function createPinball() {
  // x/y are set to when pinball is launched 
  pinball = Matter.Bodies.circle(0, 0, 16 * 5 / 4, {
    label: 'pinball',
    collisionFilter: {
      group: stopperGroup
    },
    render: {
      sprite: {
        texture: coinball,
        xScale: 0.4 * 5 / 4,
        yScale: 0.42 * 5 / 4
      }
    }
  });
  Matter.World.add(world, pinball);
  Matter.Body.setPosition(pinball, { x: 460, y: 645 });
}

function createEvents() {
  // events for when the pinball hits stuff
  Matter.Events.on(engine, 'collisionStart', function (event) {
    let pairs = event.pairs;
    pairs.forEach(function (pair) {
      if (pair.bodyB.label === 'pinball') {
        switch (true) {
          case /reset/.test(pair.bodyA.label):
            resetPinball();
            break;
          case /bumper[0-9]|wallBumper/.test(pair.bodyA.label):
            pingBumper(pair.bodyA, pair.bodyA.label);
            break;
        }
      }
    });
  });

  // regulate pinball
  Matter.Events.on(engine, 'beforeUpdate', function (event) {
    // bumpers can quickly multiply velocity, so keep that in check
    Matter.Body.setVelocity(pinball, {
      x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
      y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY)
    });

    // cheap way to keep ball from going back down the shooter lane
    if (pinball.position.x > 450 && pinball.position.y < 600 && pinball.velocity.y > 0) {
      Matter.Body.setVelocity(pinball, { x: 0, y: -20 });
    }
  });

  // mouse drag (god mode for grabbing pinball)
  Matter.World.add(
    world,
    Matter.MouseConstraint.create(engine, {
      mouse: Matter.Mouse.create(render.canvas),
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    })
  );
}

const leftTriggerDown = () => {
  window.SFX_TRIGGER.play();
  if (!isLoad.value) return;
  isLeftPaddleUp.value = true;
};
const leftTriggerUp = () => {
  if (!isLoad.value) return;
  isLeftPaddleUp.value = false;
};
const rightTriggerDown = () => {
  window.SFX_TRIGGER.play();
  if (!isLoad.value) return;
  isRightPaddleUp.value = true;
};
const rightTriggerUp = () => {
  if (!isLoad.value) return;
  isRightPaddleUp.value = false;
};

const isEnd = ref(false);
const endGame = async () => {
  // const { res, error } = await api('/score', {
  //   email: store.getters.getEmail,
  //   type: 'pinball',
  //   score: currentScore.value
  // })

  // store.dispatch('GET_USER');
}

function resetPinball() {
  life.value--;
  if (life.value <= 0 && !isEnd.value) {
    endGame();
    // alert('遊戲結束');
    currentScore.value = 0;
    window.PINBALL_BG_MUSIC.stop();
    isEnd.value = true;
  } else {
    Matter.Body.setPosition(pinball, { x: 460, y: 645 });
  }
  isPlaying.value = false
}

function launchPinball() {
  if (isEnd.value || notRecover.value) return;
  window.SFX_LAUNCH.play();
  isPlaying.value = true
  Matter.Body.setPosition(pinball, { x: 460, y: 645 });
  Matter.Body.setVelocity(pinball, { x: 0, y: -40 + rand(-2, 2) });
  Matter.Body.setAngularVelocity(pinball, 0);
}

function pingBumper(bumper, type) {
  if (type === 'wallBumper') {
    changeMerchants();
  } else {
    hitBumper(type);
    window.SFX_SCORE.play();
    const point = currentGets.value[Number(type.replace('bumper', '') - 1)].point;
    updateScore(currentScore.value + point);
  }
}

const hitBumper = (type) => {
  if (productBumpers[type]) {
    productBumpers[type] = false;
    nextTick(() => {
      productBumpers[type] = true;
    })
  }
  productBumpers[type] = true;
}

function updateScore(newCurrentScore) {
  currentScore.value = newCurrentScore;

  highScore.value = Math.max(currentScore.value, highScore.value);
}

// matter.js has a built in random range function, but it is deterministic
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// outer edges of pinball table
function boundary(x, y, width, height) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    render: {
      visible: SHOW_BLOCKKS,
      fillStyle: '#acdaa0',
      strokeStyle: '#ff4',
      lineWidth: 1
    }
  });
}

// wall segments
function wall(x, y, width, height, type, angle = 0) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    angle: angle,
    isStatic: true,
    chamfer: { radius: 4 },
    render: {
      visible: SHOW_BLOCKKS,
      fillStyle: '#fafa0088',
      strokeStyle: '#fff',
      lineWidth: 1,
    }
  });
}

function pathFromSVG(x, y, svg) {
  let vertices = Matter.Svg.pathToVertices(svg);

  return Matter.Bodies.fromVertices(x, y, vertices, {
    isStatic: true,
    render: {
      visible: SHOW_BLOCKKS,
      fillStyle: '#fa0a0088',

      // add stroke and line width to fill in slight gaps between fragments
      strokeStyle: '#fff',
      lineWidth: 1
    }
  });
}

function bumper(x, y, size, label = 'bumper') {
  let bumper = Matter.Bodies.circle(x, y, size, {
    label,
    isStatic: true,
    render: {
      visible: SHOW_BLOCKKS
    }

  });

  // for some reason, restitution is reset unless it's set after body creation
  bumper.restitution = BUMPER_BOUNCE;

  return bumper;
}

function wallBumper(x, y, width, height, color, angle) {
  let bumper = Matter.Bodies.rectangle(x, y, width, height, {
    label: 'wallBumper',
    angle: angle,
    isStatic: true,
    chamfer: { radius: 4 },
    render: {
      visible: SHOW_BLOCKKS,
      fillStyle: '#faf',
      strokeStyle: '#fff',
      lineWidth: 1
    },
  });

  // for some reason, restitution is reset unless it's set after body creation
  bumper.restitution = BUMPER_BOUNCE;

  return bumper;
}

// invisible bodies to constrict paddles
function stopper(x, y, side, position) {
  // determine which paddle composite to interact with
  let attracteeLabel = side === 'left' ? 'paddleLeftComp' : 'paddleRightComp';

  return Matter.Bodies.circle(x, y, 40, {
    isStatic: true,
    render: {
      visible: false
    },
    collisionFilter: {
      group: stopperGroup
    },
    plugin: {
      attractors: [
        // stopper is always a, other body is b
        function (a, b) {
          Matter.Engine.clear(engine);
          if (b.label === attracteeLabel) {
            let isPaddleUp = side === 'left' ? isLeftPaddleUp.value : isRightPaddleUp.value;
            let isPullingUp = position === 'up' && isPaddleUp;
            let isPullingDown = position === 'down' && !isPaddleUp;
            if (isPullingUp || isPullingDown) {
              return {
                x: (a.position.x - b.position.x) * PADDLE_PULL,
                y: (a.position.y - b.position.y) * PADDLE_PULL
              };
            }
          }
        }
      ]
    }
  });
}

// contact with these bodies causes pinball to be relaunched
function reset(x, width) {
  return Matter.Bodies.rectangle(x, 781, width, 2, {
    label: 'reset',
    isStatic: true,
    render: {
      visible: SHOW_BLOCKKS,
      fillStyle: '#fff'
    }
  });
}

const merchants = [{
  img: garmin,
  point: 1000
},
{
  img: electrolux,
  point: 2000
},
{
  img: Mk,
  point: 1000
},
{
  img: ns,
  point: 3000
}]

const currentGets = ref([])

const changeMerchants = () => {
  const tempArr = [...merchants];
  currentGets.value = [];

  currentGets.value.push(tempArr.splice(Math.floor(Math.random() * tempArr.length - 1), 1)[0])
  currentGets.value.push(tempArr.splice(Math.floor(Math.random() * tempArr.length - 1), 1)[0])
  currentGets.value.push(tempArr.splice(Math.floor(Math.random() * tempArr.length - 1), 1)[0])
  currentGets.value.push(tempArr.splice(Math.floor(Math.random() * tempArr.length - 1), 1)[0])
}

const wh = ref(0);
const updateWh = () => {
  wh.value = window.innerHeight;
}

const availableHeight = computed(() => {
  const h = wh.value - headInfoHeight.value - 24;
  return h;
})

const useAvailableH = computed(() => {
  return window.innerWidth * 800 / 500 > availableHeight.value
})

const css_ContainerHeight = computed(() => {
  return `${availableHeight.value}px`;
})

const abortController = new AbortController();
const signal = abortController.signal;

const setKeyboardEvent = () => {
  window.addEventListener('keydown', (e) => {
    if (!isLoad.value) return;
    if (e.key === 'z') {
      leftTriggerDown();
    } else if (e.key === '/') {
      rightTriggerDown();
    }
  }, { signal })

  window.addEventListener('keyup', (e) => {
    if (!isLoad.value) return;
    if (e.key === 'z') {
      leftTriggerUp();
    } else if (e.key === '/') {
      rightTriggerUp();
    }
  }, { signal })

  window.addEventListener('keydown', (e) => {
    if (!isLoad.value || isPlaying.value) return;
    if (e.code === 'Space') {
      launchPinball();
    }
  }, { signal })
}

onMounted(() => {
  document.getElementsByTagName('html')[0].classList.add('in-game');
  document.getElementsByTagName('body')[0].classList.add('in-game');
  changeMerchants();

  wh.value = window.innerHeight;

  window.addEventListener('resize', updateWh);

  setKeyboardEvent();

  checkRecover();
});

onUnmounted(() => {
  document.getElementsByTagName('html')[0].classList.remove('in-game');
  document.getElementsByTagName('body')[0].classList.remove('in-game');

  window.removeEventListener('resize', updateWh);

  abortController.abort();
});
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  touch-action: manipulation;
  pointer-events: none;
}

img {
  width: 100%;
}

.gaming_header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: fit-content;
  z-index: 9;
  * {
    pointer-events: all !important;
  }
}

.no_padding {
  &::v-deep(.va-button__content) {
    padding: 0 !important;
  }
}

.theme_wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  color: #dee2e6;
  font-family: "Hind", sans-serif;
  text-transform: uppercase;
  width: 100%;
  &.isEnd {
    * {
      pointer-events: none !important;
    }
  }
}

.BG_board {
  top: 0;
  left: 0;
  position: absolute;
  z-index: -1;

  transition: 0.1s;
}

#container {
  position: relative;
  line-height: 0;

  width: 100vw;
  height: fit-content;
  ::v-deep(canvas) {
    z-index: 1;
  }

  &.useAvailableH {
    width: calc(v-bind(css_ContainerHeight) * 500 / 800);
    height: v-bind(css_ContainerHeight);
  }

  &.placehoding {
    .BG_board {
      position: relative;
    }
  }
}

.placehoder {
  pointer-events: all;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000aa;
  z-index: 8;
  * {
    pointer-events: all;
  }
}

.headerbg {
  position: absolute;
  width: 100%;
  bottom: 86%;
  opacity: 0;
}

.trigger {
  appearance: none;
  position: absolute;
  width: 20%;
  bottom: 2%;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  outline: none;
  pointer-events: all;
}

.left-trigger {
  left: 3%;
}

.right-trigger {
  right: 3%;
}

.fire-trigger {
  appearance: none;
  position: absolute;
  bottom: 23%;
  right: 3%;

  width: 12%;
  height: 12%;
  background-color: transparent;
  user-select: none;
  outline: none;
  border: 0;
  pointer-events: all;
}

.launch_pipe_light {
  position: absolute;
  width: 10%;
  right: 4.6%;
  bottom: 18%;
  transition: 0.3s;

  opacity: 0.01;
  &.active {
    opacity: 1;
  }
}

.product {
  position: absolute;
  width: 20%;
  transform: translate(-50%, -50%);
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  &.topleft {
    top: 23.5%;
    left: 24.2%;
  }
  &.topright {
    top: 23.5%;
    left: 71.6%;
  }
  &.botleft {
    top: 52.5%;
    left: 24.2%;
  }
  &.botright {
    top: 52.5%;
    left: 71.6%;
  }

  .point {
    position: absolute;
    opacity: 0;
  }
  &.bounce {
    img {
      animation: bounce 0.4s;
    }

    .point {
      opacity: 1;
      animation: ascend 0.4s;
    }
    @keyframes bounce {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
    @keyframes ascend {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-12px);
      }
    }
  }
}

::v-deep(canvas) {
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.75);
  width: 100%;
}

.end_frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000aa;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;

  img {
    width: 80%;
  }

  .action {
    position: absolute;
    top: 51%;
    width: 42%;
    height: 7%;
    opacity: 0;
    pointer-events: all;
  }
}

.tutorial {
  pointer-events: all;

  z-index: 11;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #000;

  &.tutorial1 {
    background-image: url("../../assets/tutorial/pinball_tutorial1.jpg");
  }

  &.tutorial2 {
    background-image: url("../../assets/tutorial/pinball_tutorial2.jpg");
  }

  .next {
    pointer-events: all;
    position: absolute;
    width: 50%;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .start {
    pointer-events: all;
    position: absolute;
    width: 50%;
    top: 47%;
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
