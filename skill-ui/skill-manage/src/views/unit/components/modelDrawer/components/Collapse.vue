<template>
  <a-collapse
    v-model="activeKey"
    v-bind="$attrs"
    :expandIconPosition="'right'"
    class="my-collapse"
    style="border:none;background-color:#fff;"
    v-on="$listeners">
    <slot/>
  </a-collapse>
</template>

<script>
export default {
  name: 'Collapse',
  model: {
    prop: 'active',
    event: 'toggleCollapsePanel'
  },
  props: {
    active: Array
  },
  data () {
    return {
      activeKeys: []
    }
  },
  computed: {
    activeKey: {
      get () {
        console.log(this)
        return this.$props.active ? this.active : this.activeKeys
      },
      set (arr) {
        this.activeKeys = arr
        this.$emit('toggleCollapsePanel', arr)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@padding: 63px;
/deep/ .ant-collapse {
  border: none;
}
.my-collapse {
  border: none;
  background-color: #fff;
  /deep/ .ant-collapse-item{
    border-bottom: 1px solid #fff;
    background-color: #fff;
    .ant-collapse-header{
      padding: @gutter @padding 0 @padding;
      font-size: 18px;
      color: #333;
      .ant-collapse-arrow {
        transform:rotate(90deg);
      }
    }
    .ant-collapse-content{
      border-top: 1px solid #fff;
      > .ant-collapse-content-box {
        padding: @gutter @padding 0 @padding;
      }
    }
    &-active{
      .ant-collapse-header {
        .ant-collapse-arrow {
          transform:rotate(-180deg);
        }
      }
    }
  }
}
</style>