<template>
  <label>
    <slot />
    <input type="file" accept="image/jpeg, image/png" @change="onChange" hidden />

    <Cropper
      v-if="cropperVisible"
      :imagePath="imagePath"
      :cropSize="cropSize"
      imageType="image/png"
      fileType="blob"
      mode="scale"
      fixedBox
      :showOutputSize="false"
      @save="cutToCircle"
      @cancel="onCancel"
    />
  </label>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { nextTick } from '@vue/runtime-core';

import Cropper from "vue3-cropper";
import 'vue3-cropper/lib/vue3-cropper.css';
import '../scss/cropper.scss';

const emit = defineEmits(['save'])

const cropperVisible = ref(false)
const imagePath = ref('')
const previewImage = ref(null)
const cropSize = window.innerWidth * 0.8

const cutToCircle = (res) => {
  const src = typeof res === 'string' ? res : URL.createObjectURL(res)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext("2d");
  const cw = canvas.width;
  const ch = canvas.height;

  const img = new Image();
  img.onload = () => {
    let cw, ch;
    cw = canvas.width = img.width;
    ch = canvas.height = img.height;
    // flipX
    ctx.translate(cw, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, ch / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    canvas.toBlob(blob => {
      const result = URL.createObjectURL(blob)

      previewImage.value = result
      window.coinImage = previewImage.value;
      cropperVisible.value = false

      emit('save', result);
    })
  };

  img.src = src;
}

const onChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imagePath.value = URL.createObjectURL(file);
    cropperVisible.value = true
    setTimeout(() => {
      const options = document.querySelectorAll('.cropper .cropper__control span')
      if (options && options.length) {
        options[1].innerText = '還原';
        options[2].innerText = '裁切';
      }
    })
  }
};

const onCancel = () => {
  cropperVisible.value = false
};

</script>

<style lang="scss" scoped>
</style>