<template>
  <div class="light">
    <img src="../../assets/pinball/light.png" />
  </div>

  <div class="centerCoin">
    <img :src="coin_spin" class="coin_spin" />
  </div>

  <div class="watertank">
    <video
      src="../../assets/pinball/water_tank.mp4"
      autoplay
      playsinline
      loop
      muted
      class="w100p"
    />
  </div>

  <div class="aisleExitLight">
    <img :src="aisleExitLight_on" class="pos-a on" />
    <img :src="aisleExitLight_off" class="pos-a off" />
  </div>

  <div class="aisleLight">
    <img :src="aisleLight_on" class="pos-a on" />
    <img :src="aisleLight_off" class="pos-a off" />
  </div>

  <div class="bluewall">
    <img :src="bluewall_on" class="pos-a on" />
    <img :src="bluewall_off" class="pos-a off" />
  </div>

  <div class="redwall topleft">
    <img :src="redwall" />
  </div>

  <div class="redwall topright">
    <img :src="redwall" />
  </div>

  <div class="redwall botleft">
    <img :src="redwall" />
  </div>

  <div class="redwall botright">
    <img :src="redwall" />
  </div>

  <div class="change_off">
    <img :src="change_off" />
  </div>
</template>

<script setup>
import centerCoin from '../../assets/pinball/centerCoin.png';
import aisleExitLight_on from '../../assets/pinball/aisleExitLight_on.png';
import aisleExitLight_off from '../../assets/pinball/aisleExitLight_off.png';
import aisleLight_on from '../../assets/pinball/aisleLight_on.png';
import aisleLight_off from '../../assets/pinball/aisleLight_off.png';
import bluewall_on from '../../assets/pinball/bluewall_on.png';
import bluewall_off from '../../assets/pinball/bluewall_off.png';
import redwall from '../../assets/pinball/redwall.png';
import _24h from '../../assets/pinball/24h.gif';
import watertank from '../../assets/pinball/water_tank.gif';
import change_off from '../../assets/pinball/change_off.png';
import coin_spin from '../../assets/main/coin_spin.gif'

</script>

<style lang="scss" scoped>
* {
  z-index: 1;
}

img {
  width: 100%;
}

.coin {
  position: absolute;
  width: 54%;
  top: 27.5%;
  left: 22.5%;

  box-shadow: none;
}
.light {
  width: 8%;
  position: absolute;
  top: 2%;
  left: 51%;
  transform: translateX(-50%);

  animation: breeth 4.2s infinite;
}
.centerCoin {
  position: absolute;
  width: 28%;
  left: 36%;
  top: 27%;
}

.watertank {
  position: absolute;
  width: 9%;
  top: 22%;
  left: 0;

  ._24h {
    top: 0%;
    left: 0%;
    width: 100%;
  }
}

.aisleExitLight {
  position: absolute;
  top: 4.8%;
  right: 12.3%;
  width: 20%;

  .on {
    animation: breeth 3s infinite;
  }
  .off {
    animation: breeth_reverse 3s infinite;
  }
}

.aisleLight {
  position: absolute;
  top: 27%;
  right: 3.5%;
  width: 12%;

  .on {
    animation: breeth 4s infinite;
  }
  .off {
    animation: breeth_reverse 4s infinite;
  }
}

.bluewall {
  position: absolute;
  top: 60.4%;
  right: 27%;
  width: 12%;
  transform: rotateY(180deg);

  .on {
    animation: breeth 4s infinite;
  }
  .off {
    animation: breeth_reverse 4s infinite;
  }
}

.redwall {
  position: absolute;
  width: 3.2%;

  &.topleft {
    top: 11.5%;
    left: 38.6%;
  }
  &.topright {
    top: 11.5%;
    left: 56.8%;
  }
  &.botleft {
    top: 60.5%;
    left: 32.9%;
  }
  &.botright {
    top: 60.5%;
    left: 50.9%;
  }
}

.change_off {
  position: absolute;
  width: 20%;
  top: 71.8%;
  left: 6.4%;
}
</style>