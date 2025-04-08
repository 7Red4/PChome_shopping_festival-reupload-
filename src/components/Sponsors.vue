<template>
  <div class="pos-r w90p">
    <img src="../assets/main/sponsors.png" class="w100p" />
    <div class="content_box">
      <a
        class="sponsor_item"
        v-for="{ img, link } in displaySponsors"
        :href="!!link ? link : null"
        target="_blank"
      >
        <img :src="img" class="w100p" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import dayjs from 'dayjs'

import _3M from '../assets/main/sponsors/3M.png'
import 日虎商標 from '../assets/main/sponsors/日虎商標.png'
import 金車 from '../assets/main/sponsors/金車.png'
import yamazaki from '../assets/main/sponsors/yamazaki.png'
import ATEX橫式 from '../assets/main/sponsors/ATEX橫式.png'
import kotex_new_logo from '../assets/main/sponsors/kotex_new_logo.png'
import LG640 from '../assets/main/sponsors/LG640.png'
import linetaxi from '../assets/main/sponsors/linetaxi.png'
import locknlock from '../assets/main/sponsors/locknlock.png'
import Logitech from '../assets/main/sponsors/Logitech.png'
import pg from '../assets/main/sponsors/pg.png'
import samsung from '../assets/main/sponsors/samsung.png'
import sofy_logo from '../assets/main/sponsors/sofy_logo.png'
import Switch from '../assets/main/sponsors/Switch.png'
import tokuyo from '../assets/main/sponsors/tokuyo.png'
import ToysRUs from '../assets/main/sponsors/ToysRUs.png'

/* w2  */
// Switch
// samsung
import paula from '../assets/main/sponsors/w2/paula.png'
import ESTEELAUDER from '../assets/main/sponsors/w2/ESTEELAUDER.png'
// Logitech
import hueiyeh from '../assets/main/sponsors/w2/hueiyeh.png'
import 康生 from '../assets/main/sponsors/w2/康生.png'
import 嬌生 from '../assets/main/sponsors/w2/嬌生.png'
import Evian from '../assets/main/sponsors/w2/Evian.png'
import 提提顏 from '../assets/main/sponsors/w2/提提顏.png'
import 舒酸定 from '../assets/main/sponsors/w2/舒酸定.png'
import LUX from '../assets/main/sponsors/w2/LUX.png'
import de_hoi from '../assets/main/sponsors/w2/de_hoi.png'
import 南紡運動 from '../assets/main/sponsors/w2/南紡運動.png'
import duskin from '../assets/main/sponsors/w2/duskin.png'
// linetaxi

/* w3 */
import iRobot from '../assets/main/sponsors/w3/iRobot.png'
// import LineTaxi from '../assets/main/sponsors/w3/LineTaxi.png'
// import locknlock from '../assets/main/sponsors/w3/locknlock.png'
// import Logitech from '../assets/main/sponsors/w3/Logitech.png'
import moroccanoil from '../assets/main/sponsors/w3/moroccanoil.png'
// import Switch from '../assets/main/sponsors/w3/Switch.png'
// import Yamazaki from '../assets/main/sponsors/w3/Yamazaki.png'
// import 3M from '../assets/main/sponsors/w3/3M.png'
// import de_hoi_ from '../assets/main/sponsors/w3/de_hoi_.png'
// import duskin from '../assets/main/sponsors/w3/duskin.png'
import ECOVACS from '../assets/main/sponsors/w3/ECOVACS.png'
import hitachi from '../assets/main/sponsors/w3/hitachi.png'

const sponsors = [
  {
    img: Switch,
    link: 'https://24h.pchome.com.tw/store/DGBJKQ'
  },
  {
    img: samsung,
    link: 'https://24h.pchome.com.tw/store/DPADFN'
  },
  {
    img: tokuyo,
    link: 'https://24h.pchome.com.tw/store/DMAD05'
  },
  {
    img: 日虎商標,
    link: 'https://24h.pchome.com.tw/store/DMADH2'
  },
  {
    img: Logitech,
    link: 'https://logitech.pchomeec.tw/sites/logitech'
  },
  {
    img: linetaxi,
    link: 'https://www.pchomeec.tw/activity/AC19765422#apporder'
  },
  {
    img: 金車,
    link: 'https://24h.pchome.com.tw/store/DBAB3L'
  },
  {
    img: ToysRUs,
    link: 'https://24h.pchome.com.tw/store/DEASIN'
  },
  {
    img: pg,
    link: 'https://shopping.pchome.com.tw/marketing/coupon/v1/prod?actid=C024089'
  },
  {
    img: ATEX橫式,
    link: 'https://24h.pchome.com.tw/store/DMADG4'
  },
  {
    img: LG640,
    link: 'https://shopping.pchome.com.tw/marketing/coupon/v1/prod?actid=C024091'
  },
  {
    img: _3M,
    link: 'https://3m.pchomeec.tw/sites/3m'
  },
  {
    img: sofy_logo,
    link: 'https://24h.pchome.com.tw/store/DAAB22'
  },
  {
    img: kotex_new_logo,
    link: 'https://24h.pchome.com.tw/store/DAAB1L'
  },
  {
    img: locknlock,
    link: 'https://24h.pchome.com.tw/store/DEBMDY'
  },
  {
    img: yamazaki,
    link: 'https://24h.pchome.com.tw/store/DEAGJG'
  }
]

const sponsors_w2 = [
  {
    img: Switch,
    link: 'https://24h.pchome.com.tw/store/DGBJKQ'
  },
  {
    img: samsung,
    link: 'https://24h.pchome.com.tw/store/DGCDBD'
  },
  {
    img: paula,
    link: 'https://24h.pchome.com.tw/store/DDADFA'
  },
  {
    img: ESTEELAUDER,
    link: 'https://24h.pchome.com.tw/store/DDAD2P'
  },
  {
    img: Logitech,
    link: 'https://logitech.pchomeec.tw/sites/logitech'
  },
  {
    img: hueiyeh,
    link: 'https://24h.pchome.com.tw/store/DMADFE'
  },
  {
    img: 康生,
    link: 'https://24h.pchome.com.tw/store/DMADEW'
  },
  {
    img: 嬌生,
    link: 'https://shopping.pchome.com.tw/marketing/coupon/v1/prod?actid=C023971'
  },
  {
    img: Evian,
    link: 'https://24h.pchome.com.tw/store/DBAG70'
  },
  {
    img: 提提顏,
    link: 'https://24h.pchome.com.tw/region/DDCR'
  },
  {
    img: 舒酸定,
    link: 'https://24h.pchome.com.tw/store/DAAL04'
  },
  {
    img: LUX,
    link: 'https://24h.pchome.com.tw/region/DABB'
  },
  {
    img: de_hoi,
    link: 'https://24h.pchome.com.tw/region/DEDH'
  },
  {
    img: 南紡運動,
    link: 'https://24h.pchome.com.tw/region/DXBO'
  },
  {
    img: duskin,
    link: 'https://24h.pchome.com.tw/store/DECB58'
  },
  {
    img: linetaxi,
    link: 'https://www.pchomeec.tw/activity/AC19765422#apporder'
  },
]

const sponsors_w3 = [
  {
    img: Switch,
    link: 'https://24h.pchome.com.tw/store/DGBJKQ'
  },
  {
    img: ECOVACS,
    link: 'https://24h.pchome.com.tw/store/DMBL0L'
  },
  {
    img: Logitech,
    link: 'https://logitech.pchomeec.tw/sites/logitech'
  },
  {
    img: moroccanoil,
    link: 'https://24h.pchome.com.tw/store/DDBX0A'
  },
  {
    img: _3M,
    link: 'https://3m.pchomeec.tw/sites/3m'
  },
  {
    img: iRobot,
    link: 'https://24h.pchome.com.tw/store/DMBL0J'
  },
  {
    img: hitachi,
    link: 'https://24h.pchome.com.tw/region/DMAU'
  },
  {
    img: locknlock,
    link: 'https://24h.pchome.com.tw/store/DEBMDY'
  },
  {
    img: yamazaki,
    link: 'https://24h.pchome.com.tw/store/DEAGJG'
  },
  {
    img: de_hoi,
    link: 'https://24h.pchome.com.tw/region/DEDH'
  },
  {
    img: duskin,
    link: 'https://24h.pchome.com.tw/store/DECB58'
  },
  {
    img: linetaxi,
    link: 'https://www.pchomeec.tw/activity/AC19765422#apporder'
  },
]

const displaySponsors = ref(window.isChange ? sponsors_w3 : sponsors_w2);

</script>

<style lang="scss" scoped>
.content_box {
  position: absolute;
  width: 80%;
  height: 75%;
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
  overflow-y: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > .sponsor_item {
    width: 21%;
  }
}
</style>