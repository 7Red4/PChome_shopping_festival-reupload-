<template>
  <div class="_24h">
    <img :src="_24h" />
  </div>
  <div class="arrow">
    <img :src="arrow" />
  </div>
  <div class="productsSign">
    <img :src="productsSign" />
  </div>
  <div class="sign">
    <img :src="sign" />
  </div>
  <div class="V1111P">
    <img :src="V1111P" />
  </div>
  <div class="win">
    <img :src="win" />
  </div>
</template>

<script setup>
import _24h from '../../assets/rythemGame/24h.gif';
import productsSign from '../../assets/rythemGame/productsSign.gif';
import arrow from '../../assets/rythemGame/arrow.png';
import sign from '../../assets/rythemGame/sign.png';
import V1111P from '../../assets/rythemGame/V1111P.gif';
import win from '../../assets/rythemGame/win.gif';
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

div {
  position: absolute;
}

._24h {
  width: 20%;
  top: 47%;
  left: 0;
}
.productsSign {
  width: 26.5%;
  top: 34.5%;
  right: 0;
}
.arrow {
  width: 18%;
  top: 37%;
  right: 5%;
}
.sign {
  width: 10%;
  top: 45%;
  left: 17.5%;
}
.V1111P {
  width: 27%;
  top: 19.5%;
  right: 0;
}
.win {
  width: 15%;
  top: 26%;
  right: 0;
}
</style>