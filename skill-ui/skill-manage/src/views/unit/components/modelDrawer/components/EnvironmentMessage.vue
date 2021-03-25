<template>
  <div>
    <div v-if="drawerShowType === 'space'">
      <a-row v-for="(item,index) in environmentInfoRes" :key="index">

        <a-row>{{ item.roomName }}</a-row>
        <a-row type="flex" align="middle" >
          <a-col :span="4">{{ 'app.model.drawer.temperature' | i18n }}</a-col>
          <a-col :span="8">{{ item.temp }}°C</a-col>
          <a-col :span="4">{{ 'app.model.drawer.humidity' | i18n }}</a-col>
          <a-col :span="8">{{ item.humidity }}H</a-col>
        </a-row>
        <a-divider v-if="index+1 !== environmentInfoRes.length" />
      </a-row>
    </div>
    <div v-if="drawerShowType === 'cage'">
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.before.temperature' | i18n }}</a-col>
        <a-col :span="16">{{ environmentInfoRes[0].frontTemp }}°C</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="8">{{ 'app.model.drawer.after.temperature' | i18n }}</a-col>
        <a-col :span="16">{{ environmentInfoRes[0].backTemp }}°C</a-col>
      </a-row>
    </div>
    <div v-if="drawerShowType === 'cabinet'">
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.before.humidity' | i18n }}</a-col>
        <a-col :span="16">{{ environmentInfoRes[0].frontTemp }}°C</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="8">{{ 'app.model.drawer.after.humidity' | i18n }}</a-col>
        <a-col :span="16">{{ environmentInfoRes[0].backTemp }}°C</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnvironmentMessage',
  props: {
    drawerShowType: {
      type: String,
      default: 'space'
    },
    environmentInfoRes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.pub-bottom {
  padding-bottom: 10px;
  line-height: 1;
}
.pub-min-padding {
  padding-bottom: @gutter;
}
.padd-two {
  padding-bottom: @gutter;
}
/deep/.ant-divider {
  margin: @gutter 0;
}
</style>