<template>
  <a-modal
    v-model="visible"
    :width="1000"
    bodyStyle="height: 700px;overflow-y:scroll;"
    :footer="null"
    destroyOnClose="true"
    @ok="handleOk"
  >
    <a-tabs v-if="codes" tabPosition="left" @change="callback">
      <a-tab-pane v-for="(value, key) in codes" :key="key" :tab="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"><pre>{{ value }}</pre></a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
import { preview } from '@/api/gen'
export default {
  data () {
    return {
      visible: false,
      codes: null
    }
  },
  methods: {
    show (tableId) {
      preview(tableId).then(res => {
        this.codes = res.data
      })
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    callback (key) {
      console.log(key)
    }
  }
}
</script>
