<template>
  <div class="d-flex flex-column align--center">
    <SizeBox height="12" />
    <div class="z-index-9 d-flex flex-column align--center">
      <div class="d-flex align--center justify--center">
        <img src="../assets/main/ui/input.png" class="w80p" />
        <input
          type="email"
          class="email_input"
          v-model.trim="email"
          placeholder="email"
        />
      </div>
      <SizeBox height="12" />
      <span>此 email 將做為後續聯繫中獎使用</span>
    </div>
    <SizeBox height="18" />

    <label class="w100p pos-r">
      <CoinCropper @save="v => previewImage = v">
        <div class="coin">
          <CoinRenderer
            ref="COIN_RENDERER"
            :face="previewImage || store.getters.getFace"
            :size="400"
          />
        </div>
      </CoinCropper>
    </label>

    <img src="../assets/main/coin_description.png" class="w80p" />
    <SizeBox height="8" />
    <div class="hint mx-auto w70p">
      圖片建議使用去背或單純背景以求較佳效果
      <br />若未上傳圖片，將使用V1111P預設金幣
    </div>
    <SizeBox height="8" />
    <div class="flex-center w80p">
      <img
        src="../assets/main/ui/btn_start.png"
        class="w56p"
        @click="handleStart"
      />
    </div>

    <SizeBox height="84" />
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { nextTick, onMounted, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import CoinRenderer from '../components/CoinRenderer.vue';
import CoinCropper from '../components/CoinCropper.vue';
import { useStore } from 'vuex';
import { DEMO_EMAIL, uploadImage } from '../api';

const COIN_RENDERER = ref();
const previewImage = ref('');
const imageUploaded = ref(false);
const store = useStore();

const router = useRouter()
const emailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = ref(store.getters.getEmail || '');

watch(() => previewImage.value, async (v) => {
  if (v && email.value) {
    imageUploaded.value = false;
    try {
      const result = await uploadImage(previewImage.value, email.value);

      window.coinImage = result.url;
      imageUploaded.value = true;
    } catch (error) {
      console.error(error);
    }
  }
})

// 展示版略過表單驗證：沒填 email 就用 demo 帳號
const handleStart = async () => {
  const finalEmail = emailRule.test(email.value) ? email.value : DEMO_EMAIL;
  localStorage.setItem('e', btoa(finalEmail));
  if (previewImage.value) {
    await uploadImage(previewImage.value, finalEmail);
  }
  await store.dispatch('GET_USER');
  router.replace('/game/pinball');
}

onMounted(() => {
  if (localStorage.getItem('e')) {
    router.replace('/game/pinball')
  }
})

</script>

<style lang="scss" scoped>
* {
  color: #c4c4c4;
}

.coin {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: scale(0.5);
  margin: -90px 0;
  z-index: 0;
}

.email_input {
  color: #c4c4c4;
  position: absolute;
  width: 70%;
  height: 1.44rem;
  background-color: transparent;
  outline: none;
  appearance: none;
  border: none;

  text-align: center;
  user-select: text;
}

.hint {
  font-size: 12px;
  line-height: 1.37;
  text-align: center;
}

::v-deep(.cropper) {
  z-index: 9;
}
</style>