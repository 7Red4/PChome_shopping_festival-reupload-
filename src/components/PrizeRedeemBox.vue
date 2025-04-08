<template>
  <div class="prize_redeem_box">
    <div class="prize_item" v-for="item in prizes" :key="item.name">
      <div class="prize_title">{{ item.name }}</div>
      <img :src="item.image" class="w100p" />
      <p class="point">{{ item.redeemScore }} 分</p>
      <va-button
        class="redeem_btn"
        @click="item.redeemable && handleClick(item)"
        color="#ffffff00"
      >
        <img
          v-if="item.redeemable"
          src="../assets/main/ui/redeem.png"
          class="w100p"
        />
        <div v-else class="w100p pos-r">
          <img src="../assets/main/ui/redeemed.png" class="w100p" />
          <span
            class="abs-center redeem_text white--text"
          >{{ item.lastRedeemedAt ? '已兌換' : '兌換一空' }}</span>
        </div>
      </va-button>
    </div>
  </div>

  <RedeemDialog
    :value="isDialogFrame"
    :gift="passingGift"
    @close="isDialogFrame = false; passingGift = null; fetchPrizes()"
    :is-coin="passingGift && passingGift.name === 'coin'"
  />
</template>

<script setup>
import RedeemDialog from './RedeemDialog.vue';
import { ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import api from '../api';
import { useStore } from 'vuex';

const isDialogFrame = ref(false);
const passingGift = ref(null);
const store = useStore();
const prizes = ref([]);

const fetchPrizes = async () => {
  const { res, error } = await api('/rewards', { email: store.getters.getEmail });
  prizes.value = res ? res.rewards.map((el) => ({ ...el, isCoin: el.id === 'F3176B8A-27A2-40EF-8869-EDC2DA1ADA87' })) : [];
}

const handleClick = (item) => {
  passingGift.value = item;
  isDialogFrame.value = true;
}
/**
{
    name: '',
    image:ad asd,
    count: 1,
    point: 20000,
    reedemable: true,
    action: () => {}
  },
 */

onMounted(() => {
  fetchPrizes();
})

</script>

<style lang="scss" scoped>
$text_color: #9fe6f1;

.prize_redeem_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.prize_item {
  width: 48%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 24px;
  text-transform: inherit !important;

  .prize_title {
    width: 100%;
    text-align: center;
    color: $text_color;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 700;
    overflow: visible;
    white-space: nowrap;

    height: auto;
  }

  .point {
    color: #fff;
    font-size: 26px;
    margin-top: 4px;
    margin-bottom: 2px;
    font-weight: 500;
  }

  .redeem_btn {
    &::v-deep(.va-button__content) {
      padding: 0 !important;
    }
  }
}

.redeem_text {
  color: #000;
  font-weight: 900;
  font-size: 18px;
}
</style>