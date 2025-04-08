<template>
  <div class="lights" :class="{ 'not-load': isHigh }">
    <div class="Lwall_light1">
      <img :src="Lwall_light1_on" class="pos-a on" />
      <img :src="Lwall_light1_off" class="pos-a off" />
    </div>
    <div class="Lwall_light2">
      <img :src="Lwall_light2_on" class="pos-a on" />
      <img :src="Lwall_light2_off" class="pos-a off" />
    </div>
    <div class="Rwall_light1">
      <img :src="Rwall_light1_on" class="pos-a on" />
      <img :src="Rwall_light1_off" class="pos-a off" />
    </div>
    <div class="Rwall_light2">
      <img :src="Rwall_light2_on" class="pos-a on" />
      <img :src="Rwall_light2_off" class="pos-a off" />
    </div>
  </div>
</template>

<script setup>
import Lwall_light1_on from '../../assets/pinball/Lwall_light1_on.png'
import Lwall_light1_off from '../../assets/pinball/Lwall_light1_off.png'
import Lwall_light2_on from '../../assets/pinball/Lwall_light2_on.png'
import Lwall_light2_off from '../../assets/pinball/Lwall_light2_off.png'
import Rwall_light1_on from '../../assets/pinball/Rwall_light1_on.png'
import Rwall_light1_off from '../../assets/pinball/Rwall_light1_off.png'
import Rwall_light2_on from '../../assets/pinball/Rwall_light2_on.png'
import Rwall_light2_off from '../../assets/pinball/Rwall_light2_off.png'

const props = defineProps({
  isHigh: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
* {
  z-index: 1;
}
img {
  width: 100%;
}

.lights {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
}

.Lwall_light1 {
  position: absolute;
  width: 1.85%;
  top: 46.5%;
  left: 6%;

  .on {
    animation: breeth 4.3s infinite;
  }
  .off {
    animation: breeth_reverse 4.3s infinite;
  }
}
.Lwall_light2 {
  position: absolute;
  width: 38.7%;

  top: 0.8%;
  left: 2%;

  .on {
    animation: breeth 4.3s infinite;
  }
  .off {
    animation: breeth_reverse 4.3s infinite;
  }
}
.Rwall_light1 {
  position: absolute;
  width: 33%;
  top: 1.3%;
  left: 66.5%;

  .on {
    animation: breeth 4.1s infinite;
  }
  .off {
    animation: breeth_reverse 4.1s infinite;
  }
}
.Rwall_light2 {
  position: absolute;
  width: 13%;
  left: 84.2%;
  top: 34.5%;

  .on {
    animation: breeth 4.2s infinite;
  }
  .off {
    animation: breeth_reverse 4.2s infinite;
  }
}
</style>