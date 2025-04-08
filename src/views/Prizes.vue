<template>
  <img v-if="!isChange" src="../assets/main/hint.png" class="w100p" />
  <img v-else src="../assets/main/hint_2.png" class="w100p" />
  <div class="w100p d-flex justify--space-between">
    <CoinCropper
      @save="v => previewImage = v"
      class="edit_coin w26p flex-center flex-column"
    >
      <img src="../assets/main/edit_coin.png" class="w100p" />
      <img src="../assets/main/edit_coin_text.png" class="text" />

      <img
        v-if="!store.getters.getFace"
        src="../assets/main/coin_spin.gif"
        class="coin_spin"
      />
      <div v-else class="_3dcoin">
        <CoinRenderer
          class="coin"
          :face="previewImage || store.getters.getFace"
          :size="180"
        />
      </div>
    </CoinCropper>
    <div class="w40p pos-r align-self--center">
      <img src="../assets/main/my_coin_frame.png" class="w100p" />
      <div class="points">{{ points }}</div>
    </div>
    <div
      class="gift w26p pos-r flex-center flex-column"
      @click="isMyGiftOpen = true"
    >
      <img src="../assets/main/gift.png" class="w100p" />
      <img src="../assets/main/gift_text.png" class="text" />
    </div>
  </div>

  <SizeBox height="32" />

  <div class="reward_box pos-r">
    <div class="w100p flex-center pos-r">
      <img src="../assets/main/reward_box_top.png" class="w100p" />
    </div>
    <div class="reward_box_body fill-all t0 d-flex flex-column align--center">
      <div class="lamp_box flex-center flex-column">
        <img src="../assets/main/prize_switch_neon.png" class="w80p" />
        <SizeBox height="24" />
        <div class="prize_TV w80p">
          <img v-if="isChange" src="../assets/main/ECOVACS.png" class="w100p" />
          <img v-else src="../assets/main/11111p.png" class="w100p" />
          <va-button
            class="action"
            :class="{ w1: !isChange, w2: isChange }"
            href="https://m.facebook.com/pchome24h/"
            target="_blank"
          ></va-button>
        </div>
      </div>

      <div class="pa-6 d-flex flex-column align--center">
        <img src="../assets/main/prizes.png" class="w90p" />
        <img src="../assets/main/prize_title.png" class="w90p mt-3 mb-8" />

        <PrizeRedeemBox />
      </div>
    </div>
    <img src="../assets/main/reward_box_bot.png" class="w100p" />
  </div>

  <SizeBox height="48" />

  <div class="flex-center">
    <Sponsors />
  </div>

  <SizeBox height="64" />

  <MyGift :value="isMyGiftOpen" @close="isMyGiftOpen = false" />
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import CoinRenderer from '../components/CoinRenderer.vue';
import PrizeRedeemBox from '../components/PrizeRedeemBox.vue';
import CoinCropper from '../components/CoinCropper.vue';
import MyGift from '../components/MyGiftDialog.vue';
import Sponsors from '../components/Sponsors.vue';
import { watch } from '@vue/runtime-core';

const store = useStore();
const hasEmail = computed(() => store.getters.hasEmail);

const previewImage = ref('');
const points = computed(() => store.getters.getUser.score.total || 0)

const isMyGiftOpen = ref(false);

const isChange = window.isChange;

watch(() => previewImage.value, async () => {
  if (previewImage.value) {
    const form = new FormData();
    const res = await fetch(previewImage.value);
    const image = await res.blob();
    form.append('image', image, `${Date.now()}.png`);
    form.append('email', store.getters.getEmail);
    try {
      const res = await fetch('https://api.pchome24h-v1111p-game.com/api/uploadImage', {
        method: 'POST',
        body: form
      })

      const { result } = await res.json()

      window.coinImage = result.url;
      store.dispatch('GET_USER');
    } catch (error) {
      console.error(error);
    }
  }
})

</script>


<style lang="scss" scoped>
$text_color: #9fe6f1;
.edit_coin {
  position: relative;
  overflow: visible;

  .coin_spin {
    position: absolute;
    width: 60%;
    left: 34%;
    top: 23%;
  }

  ._3dcoin {
    position: absolute;
    width: 115%;
    top: -1%;
    left: 5.2%;
    .coin {
      width: 100%;
      height: auto;
      transform: scale(0.55);
    }
  }
  .text {
    position: absolute;
    width: 100%;
    top: 79.1%;
    right: -13%;
  }
}

.points {
  position: absolute;
  color: $text_color;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 2px 2px #878787;
}

.gift {
  overflow: visible;
  .text {
    position: absolute;
    width: 100%;
    top: 77%;
    left: -3%;
  }
}

.prize_TV {
  position: relative;
  .action {
    position: absolute;
    top: 62%;
    height: 24%;
    min-height: auto;
    opacity: 0;

    &.w1 {
      left: 16%;
      width: 22%;
    }

    &.w2 {
      left: 18%;
      width: 29%;
    }
  }
}

.lamp_box {
  margin-top: -32px;
  z-index: 0;
  background-image: url(../assets/main/lamp.png);
  background-repeat: no-repeat;
  background-size: 95%;
  background-position: center;
  width: 100%;
}

.reward_box_body {
  background-image: url(../assets/main/reward_box_bg.png);
  margin-top: -3px;
  margin-bottom: -3px;
  background-size: 100%;
}
</style>