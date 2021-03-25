<template>
  <div class="container">
    <div class="search-container">
      <vue-particles
        class="search-container-particles"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      />
      <a-row type="flex" class="search-title" align="middle" justify="center">{{ 'menu.welcome' | i18n }}</a-row>
      <a-row type="flex" class="search-text" align="middle" justify="center">
        <a-col v-if="!searchShowStatus" @click="handleOpenSearch">
          <a-icon type="search" style="color:#333;font-size:25px;color:#fff;" /><span class="text">{{ 'menu.search' | i18n }}</span>
        </a-col>
        <a-col v-if="searchShowStatus" :span="14">
          <a-input-search
            ref="inputSearch"
            :placeholder="$t('menu.search.hint')"
            class="search-input"
            size="large"
            enter-button
            @search="handleOnSearch"
            @blur="searchBlur"/>
        </a-col>
      </a-row>
    </div>
    <div class="content">
      <div class="result-container">
        <a-row v-if="searchShowStatus && (searchFinished || searchLoading)" class="title">{{ 'menu.search.result' | i18n }}</a-row>
        <search-result-type v-if="!searchLoading && searchResultList.length > 0" :searchResultList="searchResultList" @handle-on-cat-detail="handleOnCatDetail"></search-result-type>
        <div v-if="searchLoading" class="example">
          <a-spin />
        </div>
        <a-row>
          <a-empty v-if="!searchLoading&&searchShowStatus && searchFinished && searchResultList.length === 0" style="height:120px;margin:0;padding-top:20px;" :image="simpleImage" />
        </a-row>
      </div>
      <div class="dataCenter">
        <a-row class="title">{{ 'menu.dataCenter' | i18n }}</a-row>
        <template>
          <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 3, xl: 3, xxl: 3 }" :loading="dataCenterListLoading" :data-source="dataCenterList" :pagination="pagination" >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable style="width: 100%;padding:15px;" class="nouse data-card is-using" @click="handleOnCatDataCenter(item)">
                <div style="position:relative;padding-bottom:46%;width:100%;height:0;">
                  <!-- <img
                    slot="cover"
                    style="display:block;position:absolute;z-index:4;"
                    width="100%"
                    height="100%"
                    alt="example"
                    :src="item.url"
                  /> -->
                  <el-image
                    fit="cover"
                    :src="item.url"
                    style="display:block;position:absolute;z-index:4;width:100%;height:100%;"/>
                </div>
                <a-card-meta :title="item.title">
                  <template slot="description">
                    <a-row type="flex" align="middle">
                      <a-col>
                        <a-icon type="environment" style="color:#1C69D4"/>
                      </a-col>
                      <a-col class="location">{{ item.location }}({{ item.totalArea }}m²)</a-col>
                    </a-row>
                    <a-row type="flex" align="middle" class="sever-progess">
                      <a-col class="sever-slot">{{ 'menu.sever.slot' | i18n }}</a-col>
                      <a-col class="progess-container" style="flex:1;"><a-progress :percent="item.progess" size="small" /></a-col>
                    </a-row>
                  </template>
                </a-card-meta>
                <div class="circle-one"></div>
                <div class="circle-two"></div>
              </a-card>
            </a-list-item>
          </a-list>
          <!-- <a-row v-if="dataCenterList.length > 0" type="flex" align="middle" justify="end">
            <a-pagination v-model="pagination.pageNum" :default-current="pagination.defaultCurrent" :pageSize="pagination.pageSize" :total="1" @change="handleOnChange"/>
          </a-row> -->
        </template>
      </div>

    </div>
  </div>
</template>

<script>
import searchResultType from './components/searchResultType'
import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
import { Empty } from 'ant-design-vue'
import machineUrl from '@/assets/icons/machine.png'
export default {
  name: 'Home',
  components: {
    searchResultType,
    'vue-particles': VueParticles
  },
  data () {
    return {
      API: {
        search: '/system/dataCenter/search', // 搜索
        getDataCenterList: '/system/dataCenter/getDataCenterList' // 首页查询数据中心信息列表
      },
      searchShowStatus: false, // 搜索栏显示开关
      searchResultList: [ // 搜索结果数组（请求接口数据）

      ],
      searchFinished: false,
      searchLoading: false,
      nullList: [],
      // searchResultListSub: [ // 搜索结果数组（请求接口数据）
      //   {
      //     id: '1',
      //     iconUrl: '', // 类图标地址
      //     typeName: '服务器',
      //     machineList: [
      //       {
      //         id: '1111',
      //         name: 'fas2050 Disk shelf Enclosure 81231321',
      //         type: '00 19 10 110 DOSA/02/U-9'
      //       },
      //       {
      //         id: '1112',
      //         name: 'fas2050 Disk shelf Enclosure 81231321',
      //         type: '00 19 10 110 DOSA/02/U-9'
      //       }
      //     ]
      //   },
      //   {
      //     id: '2',
      //     iconUrl: '', // 类图标地址
      //     typeName: '房间',
      //     machineList: [
      //       {
      //         id: '1111',
      //         name: 'A — 22',
      //         type: '00 19 10 110 DOSA/02/U-9'
      //       },
      //       {
      //         id: '1112',
      //         name: 'C - 209',
      //         type: '00 19 10 110 DOSA/02/U-9'
      //       }
      //     ]
      //   }
      // ],
      dataCenterList: [],

      dataCenterListLoading: false, // 请求数据中心列表时的loading
      pagination: {
        defaultCurrent: 1,
        pageNum: 1,
        pageSize: 6,
        total: 0,
        onChange: page => {
          console.log(page)
          this.pagination.pageNum = page
          this.getCurrentPageDataCenterList()
        }
      }

    }
  },
  beforeCreate () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  mounted () {
    this.getCurrentPageDataCenterList()
  },
  methods: {
    /**
     * 点击文本显示输入栏
     */
    handleOpenSearch () {
      this.searchShowStatus = true
      setTimeout(() => {
         this.$refs.inputSearch.focus()
        }, 500)
    },
    /**
     * 搜索输入内容
     * @author NJH
     */
    handleOnSearch (value) {
      console.log(this.searchResultList)
      if (value) {
        this.searchLoading = true
        setTimeout(() => {
          // this.searchResultList = this.searchResultListSub.filter(item => item.typeName.includes(value))
          this.axios.get(this.API.search, {
            params: {
              value: value
            }
          }).then(res => {
            const data = res.data
            if (!data) return
            this.searchResultList = data
          })
          this.searchLoading = false
          this.searchFinished = true
        }, 300)
      }
    },
    /**
     * 点击搜索结果模型 查看详情
     * @author Njh
     */
    handleOnCatDetail (val) {
      if (val.searchItem.noSIte === '01') {
        // 提示该设备未上架
        this.$message.warning(this.$t('global.message.equipment.notOnSale'))
        return
      }
      const drawerShowType = val.secenTypeValue
      const id = val.searchItem.id
      const dataCenterId = val.searchItem.datacenterId
      this.$router.push({
        path: 'DataCenter',
        query: {
          from: 'homeSearch',
          id: id,
          // sceneType: drawerShowType,
          dataCenterId: dataCenterId
        }
      })
    },
    /**
     * 搜索框光标离开时
     * @author NJH
     */
    searchBlur () {
      // this.searchShowStatus = false
    },
    /**
     * 点击某个数据中心
     * @author NJH
     */
    handleOnCatDataCenter (item) {
      console.log(item)
        this.$router.push({
          path: 'DataCenter',
          query: {
            from: 'homeList',
            dataCenterId: item.datacenterId
          }
        })
    },
    /**
     * 查看某页数据中心
     * @author NJH
     */
    handleOnChange (page, pageSize) {
      this.getCurrentPageDataCenterList()
    },
    /**
     * 分页请求数据中心列表
     * @author NJH
     */
    getCurrentPageDataCenterList () {
      this.dataCenterListLoading = true
      setTimeout(() => {
        this.axios.post(this.API.getDataCenterList, {
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize,
          datacenterName: '',
          factoryId: ''
        }).then(res => {
          const data = res.data
          if (!data) return
          console.log(data)
          this.pagination.total = data.total
          this.dataCenterList = data.list.map(item => ({
            ...item,
            title: item.datacenterName,
            url: item.imgUrl,
            location: item.factoryName,
            totalArea: item.totalArea,
            progess: Number(item.slotUseRate)

          }))
        })
        this.dataCenterListLoading = false
       }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    position: relative;
    margin: -@gutter;
    padding: 76px 0 26px 0;
    font-size: 36px;
    color: #fff;
    background: #2c2d44;
    background-image: linear-gradient(45deg, #3f3251 2%, #002025 100%);
    &-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .search-title {
      padding-bottom: 27px;
    }
    .search-text {
      .text {
        display: inline-block;
        font-size: 28px;
        padding-left: 25px;;
      }
      .search-input {
        /deep/.ant-btn {
          color: #1890ff;
          background-color: #fff;
          border-color: #fff;
        }
        /deep/.ant-input {
          // background:none;
          outline: none;
          border: none;
          box-shadow: 0 0 transparent;
        }
      }
    }
  }
  .content {
    padding: 0 310px;
    .result-container{
      padding-top: @gutter;
      .title{
        margin-top: 20px;
        padding-left: 20px;
        color: #000;
        font-size: 28px;
        &::after{
          display: none;
        }
        &::before{
          content: '';
          width: 3px;
          height: 40px;
          background-color: #1C69D4;
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translate3d(0, -50%, 0);
        }
      }
      .example {
        height: 120px;
        text-align: center;
        border-radius: 4px;
        padding-top: 50px;
        // margin-bottom: 20px;
        // padding: 50px 50px;
        // margin: 20px 0;
      }
    }
    .dataCenter {
      padding-top: 30px;
      /deep/.ant-card {
        .ant-card-body {
          padding: 0;
          .ant-card-meta {
            .ant-card-meta-detail {
              .ant-card-meta-title {
                padding-top: 27px;
                display: flex;
                justify-content: center;
                font-size: 20px;
                color: #262626;
              }
            }
          }
        }
      }
      /deep/.ant-spin-nested-loading {
        margin-top: 50px;
      }
      .title {
        padding-left: 20px;
        color: #000;
        font-size: 28px;
        &::after{
          display: none;
        }
        &::before{
          content: '';
          width: 3px;
          height: 40px;
          background-color: #1C69D4;
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translate3d(0, -50%, 0);
        }
      }
      .data-card{
        overflow: hidden;
        position: relative;
        z-index: 1;
        .circle-one {
          position: absolute;
          height: 400px;
          width: 400px;
          left: -200px;
          bottom: -312px;
          border-radius: 200px;
          z-index:2 ;
          background-color: #c4c8d6;
          opacity: 0.2 ;
        }
        .circle-two {
          position: absolute;
          height: 660px;
          width: 660px;
          right: -335px;
          bottom: -400px;
          border-radius: 300px;
          z-index: 3;
          background-color: #c4c8d6;
          opacity: 0.3 ;
        }
        .dark-shadow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #000;
          opacity: 0.3 ;
          z-index: 5;
        }
      }
      .nouse{
        border-top: 8px solid #1F2325;
        border-left: 1px  solid transparent;
        border-right: 1px solid transparent;
        box-sizing: border-box;
      }
      .is-using {
        border: thin solid #1C69D4;
        border-top-width: 8px;
         border-left: 1px  solid #1C69D4;
        border-right: 1px solid #1C69D4;
        box-sizing: border-box;
      }
      .location {
        padding-left: 7px;
        font-size: 16px;
        color: #666;
      }
      .sever-progess {
        padding-top: @gutter;
        .sever-slot {
          font-size: 14px;
          color: #666;
        }
        .progess-container {
          padding: 0 5px;
        }
      }
    }
  }
  .progess-container {
  /deep/.ant-progress-outer{
    width: 85%;
  }
}
</style>
