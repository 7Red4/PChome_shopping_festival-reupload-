<template>
  <canvas
    v-if="showCanvas"
    ref="COIN_CANVAS"
    class="inner-coin"
    :class="{ 'not-load': to2D }"
    :width="size"
    :height="size"
  ></canvas>
  <img v-else :src="flatImg" class="w100p" />
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { inject, nextTick, onMounted, onUnmounted, watch, watchEffect } from '@vue/runtime-core';
import store from '../store';

const BABYLON = inject('BABYLON');

const props = defineProps({
  face: {
    type: String,
    defalut: ''
  },
  dontSpin: {
    type: Boolean,
    defalut: false
  },
  size: {
    type: Number,
    defalut: 400
  },
  to2D: {
    type: Boolean,
    defalut: false
  }
});

const css_size = computed(() => `${(props.size || 400)}px`);
const css_size_half_n = computed(() => `${(props.size || 400) / 2 * -1}px`);
const showCanvas = ref(true);
const flatImg = ref('');

const emit = defineEmits(['load']);

watch(
  () => props.face,
  (v) => {
    scene = null;
    nextTick(() => {
      scene = createScene();
    })
  }
)

defineExpose({
  getImage: () => {
    //
  }
})

let COIN_CANVAS = ref();

let engine = null;
let scene = null;
let sceneToRender = null;

let ratio = 1;
let camera = null;
let coinRoot = null;
const spinDirection = ref(1);

const createDefaultEngine = () => new BABYLON.Engine(
  COIN_CANVAS.value,
  true,
  {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
    adaptToDeviceRatio: true
  });

BABYLON.SceneLoader.ShowLoadingScreen = false;

const createScene = () => {
  const faceUrl = !!props.face ? props.face : "/texture/ob.png";
  const coinColor = !!props.face ? new BABYLON.Color3(0.98, 0.76, 0.15) : new BABYLON.Color3(1, 1, 1);
  const scene = new BABYLON.Scene(engine);
  camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 2.6, BABYLON.Vector3.Zero());
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
  light.intensity = !!props.face ? 1.5 : 1;

  //設定貼圖以及參數，subdivisions 可以設定精緻程度；maxHeight設定圖片的凸出程度
  const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    "faceTexture",
    faceUrl,
    {
      width: !!props.face ? 1.2 : 1,
      height: !!props.face ? 1.2 : 1,
      subdivisions: 400,
      maxHeight: !!props.face ? 0.08 : 0.2,
    });

  //調整貼圖平面高度
  ground.position.y = 0.03;
  let pbr = new BABYLON.PBRMaterial("pbr", scene);
  // new BABYLON.Color3(0.6, 0.6, 0.6) silver
  // new BABYLON.Color3(0.98, 0.76, 0.15) gold
  pbr.albedoColor = coinColor;
  pbr.metallic = 1;
  pbr.roughness = 0.3;
  pbr.clearCoat.isEnabled = true;
  pbr.clearCoat.intensity = 1;

  let hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/texture/environment.dds", scene);
  pbr.reflectionTexture = hdrTexture;
  window.hdr = hdrTexture;
  ground.material = pbr;

  let coinModelUrl = !!props.face ? "coin4.glb" : "coin4-s.glb";
  BABYLON.SceneLoader.Append("/", coinModelUrl, scene, (loadedObject) => {
    loadedObject.meshes.forEach((item) => {
      if (item.name == "__root__" || item.name == "Coin") {
        item.rotation.x = 1;
        item.material = pbr;
      }
      if (item.name == "Coin") {
        item.rotation.x = 1.55;
        item.rotation.x = 1;
        item.material = pbr;
      }
      if (item.name == "__root__") {
        ground.parent = item;
        coinRoot = item;
        item.material = pbr;
        coinRoot.rotation.y = 1.55;
        coinRoot.rotation.x = 0.1;
        coinRoot.rotationQuaternion = null;
      }
    })
  });

  return scene;
}

const initFunction = async () => {
  let asyncEngineCreation = async () => {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log("the available createEngine function failed. Creating the default engine instead");
      return createDefaultEngine();
    }
  }

  engine = await asyncEngineCreation();
  if (!engine) throw 'engine should not be null.';
  scene = createScene();
};


onMounted(async () => {
  await initFunction();
  // scene.debugLayer.show();
  engine.runRenderLoop(() => {
    if (scene && scene.activeCamera) {
      scene.render();
      if (!props.dontSpin) {
        if (coinRoot) {
          if (props.to2D) {
            COIN_CANVAS.value.toBlob(blob => {
              flatImg.value = URL.createObjectURL(blob);
              showCanvas.value = false;
              emit('load', flatImg);

              scene = null;
              engine && engine.dispose();
              engine = null;
            })
          } else {
            if (coinRoot.rotation.z > 0.4) spinDirection.value = -1;
            if (coinRoot.rotation.z < -0.4) spinDirection.value = 1;
            coinRoot.rotation.z += 0.01 * spinDirection.value;
          }
        };
      }
    }
  });

  if (!props.to2D) {
    emit('load');
  }

  window.addEventListener("resize", () => {
    engine && engine.resize();
  });
})

onUnmounted(() => {
  engine && engine.dispose();
  engine = null;
})
</script>

<style lang="scss" scoped>
.inner-coin {
  $size: v-bind(css_size);
  $size_half_n: v-bind(css_size_half_n);
  height: $size;
  // transform: translateX($size_half_n);
}
</style>