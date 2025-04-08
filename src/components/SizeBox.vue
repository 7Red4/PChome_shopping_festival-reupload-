<script>
import { h, computed } from 'vue';
const sizeUnitsRe =
  /[^d]m|[^d]ex[^d]|[^d]%|[^d]px|[^d]cm|[^d]mm|[^d]in|[^d]pt|[^d]pc|[^d]ch|[^d]rem|[^d]vh|[^d]vw|[^d]vmin|[^d]vmax/;
const validator = (v) => {
  return sizeUnitsRe.test(v) || !Number.isNaN(v);
};

export default {
  name: 'SizeBox',
  props: {
    width: {
      type: [String, Number],
      default: 0,
      validate(v) {
        return validator(v);
      }
    },
    height: {
      type: [String, Number],
      default: 0,
      validate(v) {
        return validator(v);
      }
    },
    minWidth: {
      type: [String, Number],
      default: 0,
      validate(v) {
        return validator(v);
      }
    },
    minHeight: {
      type: [String, Number],
      default: 0,
      validate(v) {
        return validator(v);
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  },

  setup(props, ctx) {
    const computedStyle = computed(() => ({
      width: Number.isNaN(Number(props.width))
        ? props.width
        : props.width
          ? `${props.width}px`
          : null,
      height: Number.isNaN(Number(props.height))
        ? props.height
        : props.height
          ? `${props.height}px`
          : null,
      minWidth: Number.isNaN(Number(props.minWidth))
        ? props.minWidth
        : props.minWidth
          ? `${props.minWidth}px`
          : null,
      minHeight: Number.isNaN(Number(props.minHeight))
        ? props.minHeight
        : props.minHeight
          ? `${props.minHeight}px`
          : null,
      display: props.inline ? 'inline-block' : 'block'
    }));

    return () => h('div', { style: computedStyle.value });
  }
};
</script>
