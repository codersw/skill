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
        <a-input v-decorator="['dictId']"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dict.dictName')"
      >
        <a-input v-decorator="['dictName', {rules: [{ required: true, message: this.$t('dict.dictName.msg') }]}]" :placeholder="this.$t('dict.dictName')" />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dict.dictType')"
      >
        <a-input v-decorator="['dictType',{rules: [{ required: true, message: this.$t('dict.dictType.msg') }]}]" :placeholder="this.$t('dict.dictType')"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dict.status')"
      >
        <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: this.$t('dict.status.msg') }]}]">
          <a-select-option :value="'0'">正常</a-select-option>
          <a-select-option :value="'1'">禁用</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dict.remark')"
      >
        <a-textarea v-decorator="['remark']" :rows="5" placeholder="..."/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { saveDictType } from '@/api/system'
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
    add () {
      this.form.resetFields()
      this.edit({ dictId: 0 })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'dictId', 'dictName', 'dictType', 'status', 'remark'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveDictType(values).then(res => {
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
  }
}
</script>
