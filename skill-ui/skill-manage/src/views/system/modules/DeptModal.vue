<template>
  <a-modal
    v-if="visible"
    v-model="visible"
    :title="this.$t('global.action')"
    style="top: 20px;"
    :width="800"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['deptId']"/>
      </a-form-item>

      <a-form-item
        :labelCol="
          labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.parentId')"
      >
        <a-tree-select
          v-decorator="['parentId', {initialValue:'0',rules: [{ required: true, message: this.$t('dept.parentId.msg') }]}]"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="depts"
          :placeholder="this.$t('dept.parentId')"
          treeDefaultExpandAll
        >
        </a-tree-select>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.deptName')"
      >
        <a-input
          v-decorator="['deptName',{rules: [{ required: true, message: this.$t('dept.deptName.msg') }]}]"
          :placeholder="this.$t('dept.deptName')"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.orderNum')"
      >
        <a-input
          v-decorator="['orderNum',{rules: [{ required: true, message: this.$t('dept.orderNum.msg')}]}]"
          :placeholder="this.$t('dept.orderNum')"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.leader')"
      >
        <a-input
          v-decorator="['leader',{rules: [{ required: true, message: this.$t('dept.leader.msg') }]}]"
          :placeholder="this.$t('dept.leader')"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.phone')"
      >
        <a-input
          v-decorator="['phone',{rules: [{ required: true, message: this.$t('dept.phone.msg') }]}]"
          :maxLength="11"
          :placeholder="this.$t('dept.phone')"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.email')"
      >
        <a-input
          v-decorator="['email',{rules: [{ required: true, message: this.$t('dept.email.msg') },{validator:isEmail}]}]"
          :maxLength="50"
          :placeholder="this.$t('dept.email')"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('dept.status')"
      >
        <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: this.$t('dept.status') }]}]">
          <a-select-option :value="'0'">正常</a-select-option>
          <a-select-option :value="'1'">停用</a-select-option>
        </a-select>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { getDeptList, saveDept } from '@/api/system'
import pick from 'lodash.pick'
import {isEmail} from '@/utils/validator'// 验证规则工具类
export default {
  name: 'DeptModal',
  components: {
  },
  data () {
    return {
      isEmail,
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      depts: [{ key: '0', value: '0', title: '无' }],
      mdl: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {

  },
  methods: {
    add (parentId) {
      this.form.resetFields()
      this.edit({ parentId: parentId || 0 })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.mdl.parentId += ''
        this.form.setFieldsValue(pick(this.mdl, 'deptId', 'parentId', 'leader', 'phone', 'status', 'email', 'orderNum', 'deptName'))
        // this.form.setFieldsValue({ ...record })
      })
      // 获取部门树
      getDeptList().then(res => {
        this.depts = [{ key: '0', value: '0', title: '无' }]
        this.buildtree(res.rows, this.depts, 0)
      })
    },
    buildtree (list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          const child = {
            key: item.deptId,
            value: item.deptId + '',
            title: item.deptName,
            children: []
          }
          this.buildtree(list, child.children, item.deptId)
          arr.push(child)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveDept(values).then(res => {
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
