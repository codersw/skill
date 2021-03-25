<template>
  <div class="container-content">
    <div v-for="(i,v) in list" :key="v" class="box">
      <a-divider v-if="v=== 0" :dashed="true"/>
      <a-row class="box-content" type="flex" align="middle">
        <a-col>
          <div class="red-circle"></div>
        </a-col>
        <a-col style="flex:1;" class="item-content" @click="handleOnCatDetail(i)">
          <a-row class="content-name">{{ i.name }}</a-row>
          <a-row v-for="(item, index) in i.infos" :key="index" class="content-type">
            <span>{{ item.label }}：</span>
            <span>{{ item.value }}</span>
          </a-row>
        </a-col>
      </a-row>
      <a-divider v-if="(v + 1) !== list.length" :dashed="true" class="divider"/>
    </div>
  </div>
</template>

<script>


export default {
  name: 'SearchResultTypeList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    secenTypeValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleOnCatDetail (item) {
      const data = {
        secenTypeValue: this.secenTypeValue,
        searchItem: item
      }
      this.$emit('handle-on-cat-detail', data)
    }
  }
}
</script>

<style lang="less" scoped>
.container-content {
  cursor: pointer;
  .red-circle {
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 10em;
    background-color: #FF0000;
  }
  .item-content {
    padding-left: @gutter;
    .content-name {
      font-size: 16px;
      color: #333;
    }
    .content-type {
      padding-top: 13px;
      font-size: 14px;
      color: #999;
    }
  }
  .box {
    &:hover {
      background-color: @hover-background-color;
    }
    .divider {
      margin: 0;
    }
    &-content {
      padding: 15px 0;
    }
  }
}
/deep/.ant-divider-horizontal {
  margin: @gutter 0;
}
</style>
