<template>
  <div @click="handleOnClickPageSearch">
    <a-button icon="search" size="large" class="radio-search" @click="changeShowSearchStatus">
    </a-button>
    <a-button
      v-if="searchShowStatus"
      class="radio-search-new "
      size="large"
      type="primary"
      icon="search"
      @click="onSearch"></a-button>
    <a-input
      v-if="searchShowStatus"
      v-model="searchValue"
      size="large"
      class="search-input"
      :placeholder="$t('app.model.drawer.searchContent')"
      :allowClear="true"
      @pressEnter="onSearch"
    />
    <a-list
      v-if="openStaus && dataSource && dataSource.length > 0"
      class="list"
      item-layout="horizontal"
      :bordered="false"
      :data-source="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta @click="handleOnCatDetail($event, item)">
          <div slot="title" href="">{{ item.name }}</div>
          <div v-for="(i, index) in item.infos" :key="index" slot="description" href="">
            <span slot="description" href="">{{ i.label }}：</span><span slot="description" href="">{{ i.value }}</span>
          </div>

          <img :src="equipment" alt="" height="14px">
          <a-avatar slot="avatar" :src="equipment" shape="square" icon="user" />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import equipment from '@/assets/icons/equipment.png'
export default {
  name: 'Search',
  props: {
    searchShowStatus: {
      type: Boolean,
      default: false
    },
    // 数据中心id
    dataCenterId: [String, Number]
  },
  watch: {
    searchShowStatus (val) {
      if (!val) {
        this.openStaus = false
        this.dataSource = []
      }
    },
    searchValue (val) {
      if (val === '') {
        this.dataSource = []
      }
    }
  },
  data () {
    return {
      API: {
        searchEquipment: '/system/dataCenter/searchEquipment'
      },
      dataSource: [], // 搜索框匹配数组
      searchValue: '',
      openStaus: false,
      equipment
    }
  },
  mounted () {
    // this.init()
    // this.animate()
    // this.initEventListener()
  },
  methods: {
    changeShowSearchStatus () {
      this.openStaus = false
      this.$emit('change-show-search-status')
    },
       /** ******************* 搜索框相关方法 *************************/
    onSearch () {
      this.openStaus = true
      this.axios.get(this.API.searchEquipment, {
        params: {
          dataCenterId: this.dataCenterId,
          value: this.searchValue
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.length === 0) {
           this.$message.warning('未查询到相关信息')
        }
        this.dataSource = res.data
      })
    },
    handleOnCatDetail (e, val) {
      e.stopPropagation()
      this.$emit('handle-on-cat-detail', val)
      this.openStaus = false
    },
    // 点击页面
    handleOnClickPageSearch (e) {
      e.stopPropagation()
    }

  }
}
</script>

<style lang="less" scoped>
.radio-search {
  width: 70px;
  // height: 40px;
  position: fixed;
  top: 100px;
  left: 0;

}
.radio-search-new {
    width: 70px;
  // height: 40px;
  position: fixed;
  top: 100px;
  left: 429px;
}
.search-input {

    position: fixed;
    left: 69px;
    top: 100px;
    width: 360px;
    // border: thin solid #cac8c8;

    box-sizing: border-box;
  }
.radio-bell {
  width: 70px;
  // height:32px;
  position: fixed;
  top: 142px;
  left: 0;
  .message-count {
    height:15px;
    width:15px;
    text-align: center;
    line-height: 12px;
    color: #fff;
    font-size: 6px;
    background-color: rgb(255, 51, 0);
    position: absolute;
    border-radius: 10em;
    top: 7px;
    right: 19px;
  }
}
.global-search-item-desc {
  flex: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}
/deep/.ant-list {
  background: #fff;
  width: 358px;
  position: fixed;
  top: 141px;
  left: 71px;
  &-item-meta-avatar{
    padding-top: 8px;
    padding-left: 10px
  }
  &-item{
    cursor: pointer;
    &:hover {
      background-color: @hover-background-color;
    }
  }
}
.maxHeight {
  max-height: 500px;
  overflow-y: auto;
  padding-right:5px;
}
/* 搜索内容列表 */
.list {
  max-height: calc(100vh - 200px);
  overflow: auto;
}
</style>
