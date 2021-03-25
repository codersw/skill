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
        <a-input v-decorator="['jobId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.jobName')">
        <a-input v-decorator="['jobName',{ rules: [{ required: true, message: this.$t('job.jobName.msg') }]}]" :placeholder="this.$t('job.jobName')"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.jobGroup')">
        <DictSelectTag
          v-decorator="['jobGroup',{rules: [{required: true, message: this.$t('job.jobGroup.msg')}]}]"
          :placeholder="this.$t('job.jobGroup')"
          :triggerChange="true"
          dictCode="sys_job_group"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" >
        <span slot="label">
          {{ 'job.invokeTarget' | i18n }}
          <a-tooltip placement="top">
            <template slot="title">
              <!-- Bean调用示例：demoTask.params('unit')
              <br />Class类调用示例：com.unit.job.task.DemoTask.params('unit')
              <br />参数说明：支持字符串，布尔类型，长整型，浮点型，整型 -->
              {{ 'job.invokeTarget.intro' | i18n }}
            </template>
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
        <DictSelectTag
          v-decorator="['invokeTarget',{rules: [{required: true, message: this.$t('job.invokeTarget.msg')}]}]"
          :placeholder="this.$t('job.invokeTarget')"
          :triggerChange="true"
          dictCode="sys_job_invoke_target"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.cronExpression')">
        <Cron v-decorator="['cronExpression', {'initialValue':'0/1 * * * * ?',rules: [{ required: true, message: this.$t('job.cronExpression.msg') }]}]" ></Cron>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.concurrent')">
        <DictSelectTag
          v-decorator="['concurrent',{rules: [{required: true, message: this.$t('job.concurrent')}]}]"
          :placeholder="this.$t('job.concurrent')"
          :triggerChange="true"
          type="radio"
          dictCode="sys_job_concurrent"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.misfirePolicy')">
        <DictSelectTag
          v-decorator="['misfirePolicy',{rules: [{required: true, message: this.$t('job.misfirePolicy')}]}]"
          :placeholder="this.$t('job.misfirePolicy')"
          :triggerChange="true"
          type="radio"
          dictCode="sys_job_misfire_policy"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.form.status')">
        <DictSelectTag
          v-decorator="['status',{rules: [{required: true, message: this.$t('job.form.status')}]}]"
          :placeholder="this.$t('job.form.status')"
          :triggerChange="true"
          type="radio"
          dictCode="sys_job_status"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="this.$t('job.remark')">
        <a-textarea v-decorator="['remark']" :rows="5" :placeholder="this.$t('job.remark')"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveSysJob } from '@/api/sysJob'
import Cron from '@/components/Cron/index'
import pick from 'lodash.pick'
export default {
  name: 'SysJobModal',
  props: {
  },
  components: {
    Cron
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
      this.edit({
        jobId: 0,
        cronExpression: '0/1 * * * * ?',
        concurrent: '1',
        misfirePolicy: '3',
        status: '0'
      })
    },
    edit (record) {
      this.mdl = Object.assign(record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'jobId', 'jobName', 'jobGroup', 'invokeTarget', 'cronExpression', 'misfirePolicy', 'concurrent', 'status', 'remark'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveSysJob(values).then(res => {
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
  }
}
</script>
