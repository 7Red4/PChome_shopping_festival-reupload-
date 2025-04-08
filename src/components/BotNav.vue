<template>
  <div
    ref="BOT_NAV"
    class="bot_nav"
    :class="{ active }"
    @click="!disabledRoutes.includes(route.path) && /^\/game\//.test(route.path) && (isActive = true)"
  >
    <img
      v-for="(s, i) in image"
      :key="s + i"
      :src="s[status[route.name] && status[route.name][i]]"
      @click="handleClick(i)"
    />
  </div>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { useRouter, useRoute } from "vue-router";
import { onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

import pinball_active from '../assets/main/ui/bot/pinball_active.png'
import rythemGame_active from '../assets/main/ui/bot/rythemGame_active.png'
import redeem_active from '../assets/main/ui/bot/redeem_active.png'
import description_active from '../assets/main/ui/bot/description_active.png'

import pinball_grey from '../assets/main/ui/bot/pinball_grey.png'
import redeem_grey from '../assets/main/ui/bot/redeem_grey.png'
import rythemGame_grey from '../assets/main/ui/bot/rythemGame_grey.png'
import description_grey from '../assets/main/ui/bot/description_grey.png'

import pinball_red from '../assets/main/ui/bot/pinball_red.png'
import rythemGame_red from '../assets/main/ui/bot/rythemGame_red.png'
import redeem_red from '../assets/main/ui/bot/redeem_red.png'
import description_red from '../assets/main/ui/bot/description_red.png'

const router = useRouter();
const route = useRoute();
const store = useStore();
const hasEmail = computed(() => store.getters.getHasEmail);

const BOT_NAV = ref();

const isActive = ref(false)
const active = computed(() => isActive.value || !/^\/game\//.test(route.path))
const disabledRoutes = ref([
  '/',
  '/login'
])

const emit = defineEmits(['changeWarning']);
watch(() => route.path, () => { isActive.value = false });


/**
name: 'Home',
name: 'Login',
name: 'About',
name: 'Prizes',
name: 'RythemGameScene',
name: 'PinballScene',
 */
const status = computed(() => ({
  Home: ['grey', 'grey', 'grey', 'active'],
  Login: ['grey', 'grey', 'grey', 'active'],
  PinballScene: ['red', 'active', 'active', 'active'],
  RythemGameScene: ['active', 'red', 'active', 'active'],
  Prizes: ['active', 'active', 'red', 'active'],
  About: [hasEmail.value ? 'active' : 'grey', hasEmail.value ? 'active' : 'grey', hasEmail.value ? 'active' : 'grey', 'red'],
}));

const actions = ref([
  () => {
    router.push({ name: 'PinballScene' })
  },
  () => {
    router.push({ name: 'RythemGameScene' })
  },
  () => {
    router.push({ name: 'Prizes' })
  },
  () => {
    router.push({ name: 'About' })
  }])

const image = [
  {
    active: pinball_active,
    grey: pinball_grey,
    red: pinball_red
  },
  {
    active: rythemGame_active,
    grey: rythemGame_grey,
    red: rythemGame_red
  },
  {
    active: redeem_active,
    grey: redeem_grey,
    red: redeem_red
  },
  {
    active: description_active,
    grey: description_grey,
    red: description_red
  },
]

let pendingCallBack = null;
const firePending = () => {
  pendingCallBack && typeof pendingCallBack === 'function' && pendingCallBack();
}

const handleClick = (i) => {
  if (isActive.value) {
    pendingCallBack = actions.value[i];
    if (
      (/^\/game\/pinball/.test(route.path) && !window.pinballNotRecover)
      || (/^\/game\/rythem-game/.test(route.path) && !window.rytemNotRecover)
    ) {
      emit('changeWarning', true);
      return;
    }
  }
  if (status.value[route.name][i] !== 'grey' && active.value) {
    actions.value[i]()
  }
}

onMounted(() => {
  document.body.addEventListener('click', (e) => {
    if (!(BOT_NAV.value === e.target || BOT_NAV.value.contains(e.target))) {
      isActive.value = false;
    }
  })
})

defineExpose({
  firePending
})
</script>

<style lang="scss" scoped>
.bot_nav {
  position: fixed;
  z-index: 10;

  bottom: 0;
  left: 50%;

  transform: translateX(-50%) translateY(calc(100% - 24px));
  transition: 0.3s;
  width: 100%;
  max-width: 480px;

  &.hide {
    transform: translateX(-50%) translateY(100%);
  }

  &.active {
    transform: translateX(-50%) translateY(0);
  }

  img {
    width: 25%;
  }
}
</style>