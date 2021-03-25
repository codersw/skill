<template>
  <j-modal
    v-if="visible"
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    wrapClassName="j-popup-modal"
    :okText="this.$t('global.button.confirm')"
    :cancelText="this.$t('global.button.cancel')"
    @ok="handleOnConfirm"
    @cancel="handleCancel">
    <a-row>
      <a-button
        type="primary"
        style="margin-left: 30px"
        @click="downloadTemplate()">
        <a-icon type="download" />{{ 'global.button.download' | i18n }}
      </a-button>
      <a-upload
        style="margin-left: 50px"
        accept=".xls,.xlsx"
        :file-list="fileList"
        :remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <a-button type="primary"> <a-icon type="upload" />{{ 'global.button.uploadfile' | i18n }}</a-button>
      </a-upload>
    </a-row>
    <a-row v-show="updateSupportShow" style="margin-top:30px;margin-left: 30px">
      <a-switch v-model="updateSupport" >
        <a-icon slot="checkedChildren" type="check" />
        <a-icon slot="unCheckedChildren" type="close" />
      </a-switch> {{ 'global.import.update' | i18n }}
    </a-row>
  </j-modal>
</template>
<script>
import { axios } from '@/utils/request'
import JModal from '@/components/JModal/index'
import { exportExcel } from '@/utils/download'
import pick from 'lodash.pick'
const MODAL_WIDTH = 500
export default {
  name: 'ImportExcel',
  components: {
    JModal
  },
  props: {
  },
  data () {
    return {
      updateSupportShow: false,
      confirmLoading: false,
      title: '',
      visible: false,
      modalWidth: MODAL_WIDTH,
      fileList: [], // 上传文件列表
      API: {
        // 模版下载url
        templateUrl: '',
        // 导入url
        importUrl: ''
      },
      updateSupport: false
    }
  },
  filters: {
  },
  created () {
  },
  methods: {
    // 下载模板
    downloadTemplate () {
      exportExcel(this.API.templateUrl, {})
    },
    // 移除文件
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    // 上传文件之前
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    // 确认导入
    handleOnConfirm (e) {
      if (this.fileList.length <= 0) {
        this.$message.warn(this.$t('global.message.select.file'))
        return
      }
      const formData = new FormData()
      this.fileList.forEach((file) => {
        formData.append('file', file)
      })
      this.confirmLoading = true
      axios.post(this.API.importUrl + '?updateSupport=' + this.updateSupport, formData).then(res => {
        this.fileList = []
        this.confirmLoading = false
        if (res.code === 0) {
          this.$message.success(this.$t('global.message.success'))
          this.$emit('callback')
          this.close()
        } else {
          this.$message.error(this.$t('global.message.fail') + res.msg)
          // this.$message.error(this.$t('global.message.fail'))
        }
      }).catch(res => {
        this.confirmLoading = false
        this.$message.error(this.$t('global.message.fail'))
      })
    },
    handleCancel () {
      this.close()
    },
    close () {
      this.fileList = []
      this.updateSupport = false
      this.visible = false
    },
    show (templateUrl, importUrl) {
     this.API = Object.assign(this.API, {templateUrl, importUrl})
     this.title = this.$t('global.button.import')
     this.visible = true
    }

  }
}
</script>
