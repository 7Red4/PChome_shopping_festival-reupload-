<template>
  <img class="main_bg" src="./assets/main/bg.png" />
  <template v-if="route.path === '/' && isShowAppBanner">
    <div class="app_banner">
      <va-icon
        class="material-icons ml-2"
        @click="isShowAppBanner = false"
        :size="36"
      >close</va-icon>

      <div class="d-flex align--center pos-r">
        <img src="/PChome_app.png" style="width: 48px;" class="mr-3" />
        <div>
          <p>PChome24h購物</p>
          <p>立即使用官方 app</p>
        </div>
      </div>

      <div class="mr-2">
        <va-button
          :rounded="false"
          color="#27A2F8"
          text-color="#fff"
          size="small"
          href="https://ecshopping.page.link/?link=https://24h.pchome.com.tw/&apn=com.PChome.Shopping&amv=1&isi=452668231&ibi=com.pchome.shopping&efr=1"
          target="_blank"
        >開啟APP</va-button>
      </div>
    </div>

    <SizeBox height="56" />
  </template>

  <div class="overflow-hidden">
    <router-view />
  </div>

  <BotNav
    ref="BOT_NAV"
    :class="{ desktop: windowWidth > 600 }"
    @changeWarning="v => isLeaveWarning = v"
  />

  <LoginPrize />

  <Teleport to="body">
    <div
      v-show="isLeaveWarning"
      style="width: 100vw; height: 100vh; z-index: 999;"
      class="overlay flex-center"
    >
      <div
        style="width: 100%;max-width: 600px; height: 100%;"
        class="flex-center"
        @click.stop="isLeaveWarning = false"
      >
        <img src="./assets/main/modal.png" class="w100p" />
        <va-button
          class="stay"
          @click.stop="isLeaveWarning = false"
          color="#ddd"
        >stay</va-button>
        <va-button class="leave" @click.stop="handleLeave">leave</va-button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { nextTick, onMounted, provide, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BotNav from "./components/BotNav.vue";
import LoginPrize from "./components/LoginPrize.vue";

const BOT_NAV = ref();
const route = useRoute();
const router = useRouter();
const store = useStore();
const isShowAppBanner = ref(true);
const isLeaveWarning = ref(false);
const showingAccessibility = ref(false);

let windowWidth = ref(window.innerWidth);
provide('windowWidth', windowWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value > 600) {
    document.getElementsByTagName('html')[0].classList.add('desktop');
    document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    document.getElementsByTagName('body')[0].classList.add('desktop');
    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
    isShowAppBanner.value = false;
    router.replace('/')
  } else {
    document.getElementsByTagName('html')[0].classList.remove('desktop');
    document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
    document.getElementsByTagName('body')[0].classList.remove('desktop');
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    isShowAppBanner.value = true;
  }
};

const handleLeave = () => {
  BOT_NAV.value.firePending();
  isLeaveWarning.value = false;
}

/**
name: 'Home',
name: 'Login',
name: 'About',
name: 'Prizes',
name: 'RythemGameScene',
name: 'PinballScene',
 */
const checkRoute = (name) => {
  // if (store.getters.getHasEmail) {
  //   if (name === 'Login') {
  //     router.replace({ name: 'PinballScene' });
  //   }
  // } else {
  //   if (
  //     name === 'Prizes' ||
  //     name === 'RythemGameScene' ||
  //     name === 'PinballScene'
  //   ) {
  //     router.replace({ name: 'Home' });
  //   }
  // }
}

watch(
  () => route,
  ({ name }) => {
    isLeaveWarning.value = false;
    checkRoute();
  }
)

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();

  setTimeout(() => {
    checkRoute(route.name);

    const useragent = navigator.userAgent;
    const useAPP = useragent.match(/PChome/);
    if (useAPP == 'PChome') {
      isShowAppBanner.value = false;
    }
  })
});

provide('isLeaveWarning', isLeaveWarning)
</script>

<style lang="scss" scoped>
.main_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -2;
}

.overlay {
  position: fixed;
  background-color: #0a0a0acd;
  top: 0;
  left: 0;
}

.app_banner {
  * {
    color: #000;
  }
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 0;
  left: 0;
  height: 56px;
  background-color: #fff;

  z-index: 9;
}

.stay,
.leave {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 8%;
  opacity: 0;
}

.stay {
  top: 47%;
}
.leave {
  top: 60%;
}
</style>
