<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-show="value" class="overlay flex-center">
        <div class="my_prize_frame w90p flex-center">
          <img src="../assets/main/my_prize_frame.png" class="w100p" />
          <img src="../assets/main/my_prize_frame_title.png" class="title" />

          <div class="content">
            <div
              class="gift_item pos-r"
              v-for="(item, i) in gifts"
              :key="`my:${item.name}`"
            >
              <a
                :href="item.redeemType === 'serial' ? item.redeemSerialLink : item.redeemLink"
                target="_blank"
                class="gift_item-img"
              >
                <img :src="item.image" class="w100p" />
              </a>
              <div @click="handleClick(item, i)" class="texts">
                <p class="px-5 item_title">{{ item.name }}</p>
                <p
                  v-if="item.redeemedSerial"
                  class="px-5 mt-1 subtitle"
                >序號 : {{ item.redeemedSerial }}</p>
              </div>
            </div>
          </div>

          <va-icon
            class="close material-icons"
            color="#fff"
            :size="48"
            @click="$emit('close')"
          >highlight_off</va-icon>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import api from "../api";

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);

const store = useStore();

const gifts = ref([]);

const isLoading = ref(false);

const init = async () => {
  isLoading.value = true;
  const { res, error } = await api('/redeemedRewards', {
    email: store.getters.getEmail
  });

  if (!error) {
    gifts.value = res.redeemedRewards || [];
  }

  isLoading.value = false;
}

watch(() => props.value, (v) => {
  v && init();
})

const handleClick = (v, i) => {
  if (v.redeemedSerial) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(v.redeemedSerial);
      alert('已複製');
    }
  }
}

onMounted(() => {
  //
})

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

.title {
  position: absolute;
  width: 60%;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.content {
  position: absolute;
  width: 80%;
  height: 80%;
  overflow-y: auto;
}

.gift_item {
  color: $text_color;
  font-weight: 500;
  font-size: 24px;
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 12px 0;
  border: 2px #fff solid;
  border-radius: 5px;
  box-shadow: 0px 1px 1px #9fe6f1;

  .gift_item-img {
    min-width: 22%;
    width: 22%;
  }

  .item_title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 14px;
  }
}

.texts {
  * {
    user-select: text !important;
  }
}

.close {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
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