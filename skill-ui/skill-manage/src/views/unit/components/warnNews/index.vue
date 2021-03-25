<template>
  <div @click="handleOnClickPageWarnNews">
    <a-badge :count="listLength" :overflow-count="10" class="badge" :class="[listLength > 10 ? 'long': listLength === 10 ? 'normal':'short']">
      <a-button icon="bell" size="large" class="radio-bell" @click="changeShowNewsStatus">
        <!-- <a href="#" class="head-example" /> -->
      </a-button>
    </a-badge>
    <div v-if="showNewsStatus && newsList.length>0" class="new-container">
      <div class="maxHeight">
        <a-row
          v-for="(item,index) in newsList"
          :key="index"
          class="item"
          type="flex"
          align="middle"
          @click.native="handleOnCatWarnNews(item)">
          <a-col>
            <div class="circle"></div>
          </a-col>
          <a-col style="padding-left:10px;">
            <a-row>
              <span class="item-name">{{ item.name || '设备' }}</span>
              <span class="item-status">{{ item.description }}</span>
            </a-row>
            <a-row class="item-time">{{ item.time }}</a-row>
          </a-col>
          <a-divider v-if="index!== newsList.length - 1"/>
        </a-row>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'WarnNews',
  props: {
    showNewsStatus: {
      type: Boolean,
      default: false
    },
    newsList: {
     type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    newsList (val) {
      this.listLength = val.length
    }
  },
  computed: {

  },
  data () {
    return {
      listLength: 0
      // messageCount: 3
      // newsList: [
      //   {id: '1', name: 'fas2050 Disk shelf Enclosure', time: '2020-11-16 16:48:45', status: '机柜门异常开启'},
      //   {id: '2', name: 'fas2050 Disk shelf Enclosure', time: '2020-11-16 16:48:45', status: '机柜门异常开启'},
      //   {id: '3', name: 'fas2050 Disk shelf Enclosure', time: '2020-11-16 16:48:45', status: '机柜门异常开启'}

      //   ]


    }
  },
  mounted () {

  },
  methods: {
    changeShowNewsStatus () {
      this.$emit('change-show-news-status')
    },
    handleOnCatWarnNews (val) {
      this.$emit('handle-on-cat-warn-news', val)
    },
    // 点击页面
    handleOnClickPageWarnNews (e) {
      e.stopPropagation()
    }
  }
}
</script>

<style lang="less" scoped>
.badge{
  position: fixed;
  top: 152px;
  // left: 59px;
}
.long{
  left:59px;
}
.short{
  left: 50px;
}
.normal{
 left: 56px;
}
.radio-bell {
  width: 70px;
  // height:32px;
  position: fixed;
  top: 139px;
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
.new-container {
  position: fixed;
  top: 140px;
  left: 70px;
  background-color: #fff;
  padding: 10px;
  .circle {
    height: 8px;
    width: 8px;
    background-color: red;
    border-radius: 10em;
  }
  .item-name {
    display: inline-block;
    width: 210px;
    font-size: 14px;
    color: #333;
  }
  .item-status {
    display: inline-block;
    font-size: 12px;
    color: @color-primary;
  }
  .item-time {
    font-size: 12px;
    color: #999;
  }
}
.maxHeight {
  max-height: 500px;
  overflow-y: auto;
  padding-right:5px;
  .item{
    padding: 5px;
    padding-bottom: 0;
    cursor: pointer;
    &:hover {
      background-color: @hover-background-color;
    }
  }
}
.item-padding {
  padding-bottom: 3px;
}
/deep/.ant-divider-horizontal {
  margin: 5px 0;
  margin-bottom: 0;
}
</style>
