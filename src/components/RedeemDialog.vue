<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-show="value" class="overlay flex-center" @click.stop="doClose">
        <div class="my_prize_frame w90p flex-center" @click.stop>
          <img src="../assets/main/redeem_dialog.png" class="w100p" />

          <div v-if="gift" class="content">
            <p class="prize_name">{{ gift.popupName }}</p>
            <SizeBox height="16" />
            <div v-if="gift.isCoin && face" class="coin_wrapper">
              <CoinRenderer
                @load="handleCoinLoad"
                :class="{ coin: isCoinRendered }"
                :face="face"
                :size="400"
              />
            </div>
            <img v-else :src="gift.image" class="w100p" />
            <SizeBox height="16" />
            <template v-if="gift.isCoin">
              <p class="description text-center">
                <span class="title">製作你的雷雕 V1111P 金幣!</span>
                <br />在11/5-11/7於華山文創園區舉辦的
                <br />PChome24h V1111P 實體活動中領取
                <br />
              </p>
              <SizeBox height="24" />
              <div class="d-flex align--center justify--center">
                <img src="../assets/main/ui/input.png" class="w100p" />
                <input
                  type="name"
                  class="input"
                  v-model.trim="name"
                  placeholder="真實姓名"
                />
              </div>
              <div class="d-flex align--center justify--center">
                <img src="../assets/main/ui/input.png" class="w100p" />
                <input
                  type="mobile"
                  class="input"
                  v-model.trim="mobile"
                  placeholder="手機號碼"
                />
              </div>
              <SizeBox height="12" />
              <p class="note">
                兌換注意事項：
                <br />1. 硬幣中間將以雷雕刻製上傳圖片，實際雷雕效果將以實物為準。
                <br />2. 建議上傳圖片為去背或單色背景以求較佳雷雕效果。
                <br />3.11/1-11/3 限定三日限量預約客製雷雕硬幣，11/1 80名/ 11/2 100名，11/3 70名
                <br />4.11/5-11/7於華山文創園區活動現場對照姓名及電話領取。
                <br />
              </p>
            </template>
            <template v-else>
              <div
                v-show="serial && gift.redeemType === 'serial'"
                class="copy pos-r"
                @click="copySerial"
              >
                <img src="../assets/main/ui/input.png" class="w100p" />
                <input
                  ref="SERIAL"
                  class="serial_input abs-center w80p"
                  :value="serial"
                />
                <span class="copy_text">複製</span>
              </div>
            </template>
            <SizeBox height="4" />
            <div class="w100p flex-center">
              <div v-if="gift.redeemable" class="w80p pos-r">
                <div class="w100p" v-if="!redeemed" @click="doRedeem">
                  <img src="../assets/main/ui/btn_box.png" class="w100p" />
                  <span class="abs-center redeem_text">{{ redeemText1 }}</span>
                </div>
                <div v-else-if="gift.isCoin" class="w100p pos-r">
                  <img src="../assets/main/ui/redeemed.png" class="w100p" />
                  <span class="abs-center redeem_text white--text">已兌換</span>
                </div>
                <a v-else class="w100p" :href="url" target="_blank">
                  <img src="../assets/main/ui/btn_box.png" class="w100p" />
                  <span class="abs-center redeem_text">{{ redeemText2 }}</span>
                </a>
              </div>
              <div v-else class="w80p pos-r">
                <img src="../assets/main/ui/redeemed.png" class="w100p" />
                <span class="abs-center redeem_text white--text">已兌換</span>
              </div>
            </div>
          </div>

          <va-icon
            class="close material-icons"
            color="#fff"
            :size="48"
            @click.stop="doClose"
          >highlight_off</va-icon>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from '@vue/runtime-core';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import api from "../api";
import CoinRenderer from "./CoinRenderer.vue";
import copy from '../plugin/copy'

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  gift: {
    type: Object,
    default: null
  },
  isCoin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close']);

const SERIAL = ref();
const store = useStore();
const redeemed = ref(false);
const name = ref('');
const mobile = ref('');
const serial = ref('');
const url = ref(null);
const isCoinRendered = ref(false);
const redeemText1 = computed(() => props.gift.isCoin ? '完成兌換' : props.gift.redeemType === 'serial' ? '兌換序號' : '兌換獎勵');
const redeemText2 = computed(() => props.gift.isCoin ? '已兌換' : props.gift.redeemType === 'serial' ? '前往使用' : '前往連結');

const face = computed(() => store.getters.getFace);

const handleCoinLoad = () => {
  setTimeout(() => {
    isCoinRendered.value = true
  }, 200)
}

watch(() => redeemed.value,
  (v) => {
    v && store.dispatch('GET_USER')
  }
)

const doClose = () => {
  emit('close');
  serial.value = '';
  url.value = null;
  redeemed.value = false;
  isCoinRendered.value = false;
}

const copySerial = () => {
  SERIAL.value.select();
  document.execCommand("copy");
  getSelection().removeAllRanges();
  SERIAL.value.blur();
  alert('已複製')
}

const redeem = async () => {
  if (!store.getters.getEmail) {
    const router = useRouter();
    router.push('/login');
    return;
  }
  const { res, error } = await api(`/redeem/${props.gift.id}`, {
    email: store.getters.getEmail
  });

  if (error) {
    switch (error.status) {
      case 404:
        alert('獎勵不存在');
        break;
      case 400:
        alert('獎勵不在可兌換時間');
        break;
      case 412:
        alert('積分不足');
        break;
      case 429:
        alert('已經兌換過了，或是獎勵已經被兌換完了');
        break;

      default:
        break;
    }

    return;
  }

  if (props.gift.redeemType === 'serial') {
    serial.value = res.serial;
    url.value = res.redeemSerialLink;
  } else if (props.gift.redeemType === 'link') {
    url.value = res.url;
  }

  redeemed.value = true;
}

const redeemCoin = async () => {
  // 展示版略過表單驗證：沒編輯硬幣就用預設金幣、姓名電話可留空
  if (!store.getters.getEmail) {
    const router = useRouter();
    router.push('/login');
    return;
  }

  const Prize = await api(`/redeem/${props.gift.id}`, {
    email: store.getters.getEmail
  });

  if (Prize.error) {
    switch (Prize.error.status) {
      case 404:
        alert('獎勵不存在');
        break;
      case 400:
        alert('獎勵不在可兌換時間');
        break;
      case 412:
        alert('積分不足');
        break;
      case 429:
        alert('已經兌換過了，或是獎勵已經被兌換完了');
        break;

      default:
        break;
    }

    return;
  }

  const Coin = await api('/redeem/coin', {
    email: store.getters.getEmail,
    name: name.value,
    phone: mobile.value
  });
  if (Coin.error) {
    console.error(Coin.error);
  }

  redeemed.value = true;
}

const doRedeem = () => {
  if (props.gift.isCoin) {
    redeemCoin()
  } else {
    redeem()
  }
}

</script>

<style lang="scss" scoped>
$text_color: #9fe6f1;
.overlay {
  background-color: rgba(#000000, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 12;

  & > div {
    transition: 0.2s;
  }
}

.my_prize_frame {
  position: relative;
}

.description {
  line-height: 1.27;
  font-size: 14px;
  .title {
    font-size: 16px;
  }
}

.note {
  font-size: 12px;
  color: #fff;
  line-height: 1.26;
}

.copy_text {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  color: $text_color;
  font-weight: bold;
}

.serial_input {
  width: 50%;
  background-color: transparent;
  outline: none;
  border: none;
  text-align: center;
}

.coin_wrapper {
  width: 100%;
  position: relative;
  transform: scale(0.55);

  display: flex;
  align-items: center;
  justify-content: center;

  margin: -80px 0;
}

.redeem_text {
  color: #000;
  font-weight: 900;
  font-size: 24px;
}

.input {
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

.content {
  position: absolute;
  top: 5%;
  width: 80%;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
}

.prize_name {
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
  white-space: pre-wrap;
}

.gift_item {
  color: $text_color;
  font-weight: 500;
  font-size: 24px;
}

.close {
  position: absolute;
  bottom: 93%;
  left: 88%;
  background-color: #000;
  border-radius: 100%;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  & > div {
    transform: scale(0.9);
  }
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  & > div {
    transform: scale(1);
  }
}
</style>