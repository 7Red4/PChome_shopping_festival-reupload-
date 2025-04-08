<template>
  <div class="prize_box w95p">
    <img src="../assets/main/prize_box.png" class="w100p" />
    <div class="prize_container">
      <img
        v-for="      img in displayPrizes"
        :src="img"
        :key="img"
        class="w22p"
      />
    </div>
  </div>
</template>

<script setup>
import linetaxi from '../assets/main/prizes/fourBig/linetaxi.png';
import Pcoin from '../assets/main/prizes/fourBig/Pcoin.png';
import tokuyo from '../assets/main/prizes/fourBig/tokuyo.png';
import tvreward from '../assets/main/prizes/fourBig/tvreward.png';

import 三星硬碟 from '../assets/main/prizes/fourBig/三星硬碟.png';
import ESTEELAUDER from '../assets/main/prizes/fourBig/ESTEELAUDER.png';

import ECOVACS from '../assets/main/prizes/fourBig/ECOVACS.png';
import logitech from '../assets/main/prizes/fourBig/logitech.png';
import moroccanoil from '../assets/main/prizes/fourBig/moroccanoil.png';


import { ref } from '@vue/reactivity';
import dayjs from 'dayjs';

const prizes = [
  Pcoin,
  三星硬碟,
  ESTEELAUDER,
  linetaxi,
]

const prizes_2 = [
  Pcoin,
  ECOVACS,
  moroccanoil,
  logitech,
]

const displayPrizes = ref(window.isChange ? prizes_2 : prizes);

</script>

<style lang="scss" scoped>
.prize_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prize_container {
  position: absolute;
  left: 10%;
  bottom: 16%;
  width: 80%;
  height: 50%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>