<template>
  <a-modal
    v-model="visible"
    title="操作"
    style="top: 20px;"
    :width="800"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['jobLogId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="异常信息">
        <a-textarea v-decorator="['exceptionInfo']" :rows="10" placeholder="..." :readonly="true"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveSysJobLog } from '@/api/sysJobLog'
import pick from 'lodash.pick'
export default {
  name: 'SysJobLogModal',
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
      this.edit({ jobLogId: '' })
    },
    edit (record) {
      this.mdl = Object.assign(record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'jobLogId', 'exceptionInfo'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveSysJobLog(values).then(res => {
            if (res.code === 0) {
              this.$message.success(this.$t('global.message.save.success'))
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.msg)
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
