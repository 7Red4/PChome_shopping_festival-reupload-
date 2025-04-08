<template>
  <div class="divider">
    <img :src="divider_on" class="pos-a on" />
    <img :src="divider_off" class="pos-a off" />
  </div>
  <div v-if="!isHigh" class="Ltrackside">
    <img :src="Ltrackside_on" class="pos-a on" />
    <img :src="Ltrackside_off" class="pos-a off" />
  </div>
  <div v-if="!isHigh" class="Rtrackside">
    <img :src="Rtrackside_on" class="pos-a on" />
    <img :src="Rtrackside_off" class="pos-a off" />
  </div>
</template>

<script setup>
import divider_on from '../../assets/rythemGame/divider_on.png'
import divider_off from '../../assets/rythemGame/divider_off.png'
import Ltrackside_on from '../../assets/rythemGame/Ltrackside_on.png'
import Ltrackside_off from '../../assets/rythemGame/Ltrackside_off.png'
import Rtrackside_on from '../../assets/rythemGame/Rtrackside_on.png'
import Rtrackside_off from '../../assets/rythemGame/Rtrackside_off.png'

const props = defineProps({
  isHigh: {
    type: Boolean
  }
})

</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.divider {
  position: absolute;
  width: 62%;
  top: 32.5%;
  left: 19%;
  .on {
    animation: breeth 3s infinite;
  }
  .off {
    animation: breeth_reverse 3s infinite;
  }
}
.Ltrackside {
  position: absolute;
  width: 38%;
  left: 0%;
  top: 31%;
  .on {
    animation: breeth 3s infinite;
  }
  .off {
    animation: breeth_reverse 3s infinite;
  }
}
.Rtrackside {
  position: absolute;
  width: 38%;
  right: 0;
  top: 31%;
  .on {
    animation: breeth 3s infinite;
  }
  .off {
    animation: breeth_reverse 3s infinite;
  }
}
</style>