<template>
  <Teleport to="body">
    <div
      v-if="isShowLoginPrize"
      style="width: 100vw; height: 100vh;"
      class="overlay flex-center"
      @click="close"
    >
      <div class="w85p pos-r flex-center">
        <img src="../assets/main/login_prize_frame.png" class="w100p" />
        <div class="content">
          <div
            class="item pos-r w80p"
            v-for="{ className, text, point } in [...days.slice(1), days[0]]"
            :class="className"
          >
            <img
              v-if="className === 'redeemed'"
              class="w100p"
              src="../assets/main/ui/logPrize/getted.png"
            />
            <img
              v-if="className === 'normal'"
              class="w100p"
              src="../assets/main/ui/logPrize/not_getted.png"
            />
            <img
              v-if="className === 'redeem'"
              class="w100p"
              src="../assets/main/ui/logPrize/get_today.png"
            />
            <div class="abs-center w90p">{{ text }} | {{ point }} 積分</div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';

const store = useStore();

const _isShowLoginPrize = ref(true);
const isShowLoginPrize = computed(() => store.state.User.hasLoginReward && _isShowLoginPrize.value);
const weekRecord = computed(() => store.getters.getWeek)

const close = () => {
  _isShowLoginPrize.value = false;
}

const parseClassName = (el, i) => {
  let out = 'normal';
  if (weekRecord.value[i]) {
    out = 'redeemed'
  }
  out = i == dayjs().format('d') ? 'redeem' : 'normal'
  return out;
}

const days = [
  {
    text: '週日',
    point: 2000
  },
  {
    text: '週一',
    point: 1000
  },
  {
    text: '週二',
    point: 2000
  },
  {
    text: '週三',
    point: 1000
  },
  {
    text: '週四',
    point: 2000
  },
  {
    text: '週五',
    point: 1000
  },
  {
    text: '週六',
    point: 1000
  }
].map((el, i) => ({
  ...el,
  className: parseClassName(el, i)
}));
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  background-color: #0a0a0acd;
  top: 0;
  left: 0;
  z-index: 99;

  .content {
    position: absolute;
    top: 11%;
    width: 95%;
    height: 86%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
  }
}

.item {
  font-weight: bold;
  font-size: 18px;
  * {
    text-align: center;
  }
  &.redeemed {
    * {
      color: #9fe6f1;
    }
  }

  &.normal {
    * {
      color: #b0b0b0;
    }
  }

  &.redeem {
    * {
      color: #feecaa;
    }
  }
}
</style>