<template>
  <div class="close-button-wrap">
    <a-button
      type="default"
      icon="caret-up"
      link
      block
      class="close-button"
      @click="onClick">{{ 'app.model.drawer.packUp' | i18n }}</a-button>
    <a-button
      v-show="isFixed"
      type="default"
      icon="caret-up"
      link
      block
      class="close-button close-button-fixed"
      @click="onClick">{{ 'app.model.drawer.packUp' | i18n }}</a-button>
  </div>
</template>

<script>
export default {
  props: {
    scrollY: {
      type: Number,
      default: 0
    },
    isFixed: Boolean
  },
  methods: {
    onClick () {
      this.$emit('on-click-close')
    }
  }
}
</script>

<style lang="less" scoped>
@padding: 63px;
@width: 386px;
.close-button-wrap {
  position: relative;
}
.close-button {
  margin: @gutter -@padding 0 -@padding;
  width: @width;
  border: 0;
  border-top: 1px dashed @color-gray-bg;
  box-shadow: none;
  &::after {
    content: none;
  }
}
.close-button-fixed {
  position: fixed;
  z-index: 11111;
  bottom: 0;
  left: initial;
  right: initial;
  transition: none;
}
</style>