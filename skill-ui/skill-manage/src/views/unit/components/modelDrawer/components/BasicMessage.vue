<template>
  <div ref="container">
    <div v-if="drawerShowType === 'space'">
      <a-row type="flex" align="middle" :gutter="16" class="pub-bottom">
        <a-col :span="8">{{ 'app.model.drawer.factory' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.factoryName }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="8">{{ 'app.model.drawer.area' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.totalArea }}m²</a-col>
      </a-row>
    </div>
    <div v-if="drawerShowType === 'cage'">
      <a-row v-if="baseInfoRes.rackAisleType" type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8"> {{ 'app.model.drawer.type' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.rackAisleType }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.serialNumber' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.serialNo }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.installationDate' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.installationDate }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="8">{{ 'app.model.drawer.location' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.position }}</a-col>
      </a-row>
    </div>
    <div v-if="drawerShowType === 'cabinet'">
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.serialNumber' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.serialNo }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.manufacturers' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.manuFacturerName }}</a-col>
      </a-row>
      <!-- <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">机柜类型</a-col>
        <a-col :span="16">{{ baseInfoRes.rackTypeName }}</a-col>
      </a-row> -->
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.cabinetChannel' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.rackAisleName }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.load' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.limitWeight }}kg</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.height' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.height }}m</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.width' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.width }}m</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.depth' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.depth }}m</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16" class="padd-two">
        <a-col :span="8">{{ 'app.model.drawer.ubit' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.limitUnit }}</a-col>
      </a-row>
      <a-row type="flex" align="middle" :gutter="16">
        <a-col :span="8">{{ 'app.model.drawer.available.ubit' | i18n }}</a-col>
        <a-col :span="16">{{ baseInfoRes.startUnit }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicMessage',
  props: {
    drawerShowType: {
      type: String,
      default: 'space'
    },
    baseInfoRes: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('get-panel-one-height', this.$refs.container.offsetHeight)
    })
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
</style>