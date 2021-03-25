<template>
  <div class="container">
    <div v-for="(item,index) in searchResultList" :key="index">
      <a-collapse class="type-container" :default-active-key="item.id" expandIconPosition="right" :bordered="false">
        <a-collapse-panel :key="item.id" :style="customStyle">
          <template slot="header">
            <a-row type="flex" align="middle">
              <a-icon type="database" /> <span class="type-name">{{ item.typeName }}</span>
            </a-row>
          </template>
          <search-result-type-list :secenTypeValue="item.id" :list="item.machineList" @handle-on-cat-detail="handleOnCatDetail"></search-result-type-list>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import searchResultTypeList from '../../components/searchResultTypeList'

export default {
  name: 'SearchResultType',
  components: {
    searchResultTypeList
  },
  props: {
    searchResultList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      customStyle: 'background: #FAFAFA;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
    }
  },
  methods: {
    handleOnCatDetail (val) {
      this.$emit('handle-on-cat-detail', val)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .type-container {
    margin-top: 23px;
    // /deep/.ant-collapse-header {
    //   padding-bottom: 0;
    // }
    .type-name {
      display: inline-block;
      padding-left: 23px;
      font-size: 20px;
      color: #333;
    }
    /deep/.ant-collapse-item {
      .ant-collapse-arrow {
        transform: translateY(-50%) rotate(90deg);
      }
      &-active{
        .ant-collapse-header {
          .ant-collapse-arrow {
            transform: translateY(-50%) rotate(-180deg);
          }
        }
      }
    }
    /deep/ .container-content {
      > div {
        &:first-child {
          .ant-divider {
            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }
    /deep/.ant-collapse-header {
      padding-bottom: 12px;
    }
    /deep/ .ant-divider-horizontal {
      margin: 0;
    }
  }
}

</style>
