<template>
  <div>
    <slot></slot>
    <CloseButtonFixed :is-fixed="isFixed" :scroll-y="scrollY" @on-click-close="onClickClose"/>
  </div>
</template>

<script>
import { getOffset } from '../../../../../utils/domUtil.js'
import CloseButtonFixed from './CloseButtonFixed'
export default {
  name: 'CollapsePanel',
  components: {
    CloseButtonFixed
  },
  props: {
    activeKey: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    scrollY: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isFixed () {
      const $scrollEl = document.getElementById('myDrawer')
      const $parent = this.$parent
      // 判断首次渲染是否已完成
      if (!this.$parent.$el) {
        return false
      }
      const TOP = getOffset($parent.$el, $scrollEl).top
      return TOP + $parent.$el.offsetHeight > $scrollEl.offsetHeight + this.scrollY + this.gutterGutter + 15 &&
        TOP < $scrollEl.offsetHeight + this.scrollY
    }
  },
  methods: {
    onClickClose () {
      this.$emit('close', this.activeKey)
    }
  }
}
</script>

<style lang="less" scoped>
</style>