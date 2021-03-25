<template>
  <a-modal
    v-model="visible"
    :title="this.$t('global.action')"
    style="top: 20px;"
    :width="800"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['dictCode']"/>
      </a-form-item>
      <a-form-item style="display:none">
        <a-input v-decorator="['dictType']"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dictData.dictLabel')"
      >
        <a-input v-decorator="['dictLabel', {rules: [{ required: true, message: this.$t('dictData.dictLabel.msg') }]}]" :placeholder="this.$t('dictData.dictLabel')" />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dictData.dictValue')"
      >
        <a-input v-decorator="['dictValue',{rules: [{ required: true, message: this.$t('dictData.dictValue.msg') }]}]" :placeholder="this.$t('dictData.dictValue')"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dictData.dictSort')"
      >
        <a-input v-decorator="['dictSort',{rules: [{ required: true, message: this.$t('dictData.dictSort.msg') }]}]" :placeholder="this.$t('dictData.dictSort')"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dictData.status')"
      >
        <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: this.$t('dictData.status.msg') }]}]">
          <a-select-option :value="'0'">正常</a-select-option>
          <a-select-option :value="'1'">禁用</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dictData.remark')"
      >
        <a-textarea v-decorator="['remark']" :rows="5" placeholder="..."/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { saveDictData } from '@/api/system'
import pick from 'lodash.pick'
export default {
  name: 'DictModal',
  props: {
  },
  components: {
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      roleAll: [],
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    add (dictType) {
      this.form.resetFields()
      this.edit({ dictCode: 0, dictType: dictType })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'dictCode', 'dictType', 'dictLabel', 'dictValue', 'dictSort', 'status', 'remark'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveDictData(values).then(res => {
            if (res.code === 0) {
              this.$message.success(this.$t('global.message.save.success'))
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.success(res.msg)
            }
          }).catch(() => {
            this.$message.success(this.$t('global.message.error'))
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
