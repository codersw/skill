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
    <a-spin :spinning="spinning">
      <a-form :form="form">
        <a-form-item style="display:none">
          <a-input v-decorator="['userId']"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('user.loginName')"
        >
          <a-input v-decorator="['loginName', {rules: [{ required: true, message: this.$t('user.loginName.msg') }]}]" :placeholder="this.$t('user.loginName')" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('user.userName')"
        >
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: this.$t('user.userName').msg }]
              }
            ]"
            placeholder="起一个名字"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('user.status')"
        >
          <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: this.$t('user.status.msg') }]}]">
            <a-select-option :value="'0'">正常</a-select-option>
            <a-select-option :value="'1'">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('user.deptId')"
        >
          <a-tree-select
            v-decorator="['deptId', {rules: [{ required: true, message: this.$t('user.deptId.msg') }]}]"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="deptTree"
            :placeholder="this.$t('user.deptId')"
            treeDefaultExpandAll
            @change="onChange"
          >
          </a-tree-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('user.remark')"
        >
          <a-textarea v-decorator="['remark', {rules: [{ required: false, message: this.$t('user.remark.msg') }]}]" :rows="5" placeholder="..."/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="this.$t('user.roleIds')"
        >
          <a-select
            v-decorator="['roleIds', {rules: [{ required: false, message: this.$t('user.roleIds.msg') }]}]"
            style="width: 100%"
            mode="multiple"
            :allowClear="true"
          >
            <a-select-option v-for="(action) in roleAll" :key="action.roleId" >{{ action.roleName }}</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { getRoleAll, saveUser, getUser } from '@/api/system'
import pick from 'lodash.pick'
export default {
  name: 'UserModal',
  props: {
    deptTree: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
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
      confirmLoading: false,
      roleAll: [],
      mdl: {},
      deptCheck: true,
      spinning: false,
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
    this.loadRoleAll()
  },
  methods: {
    add () {
      this.form.resetFields()
      this.mdl = Object.assign({}, { userId: 0, deptId: '' })
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'userId', 'loginName', 'userName', 'status', 'roleIds', 'remark', 'deptId'))
      })
    },
    edit (record) {
      if (record.userId > 0) {
        this.spinning = true
        getUser(record.userId).then(res => {
          this.mdl = Object.assign({}, res)
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.mdl, 'userId', 'loginName', 'userName', 'status', 'roleIds', 'remark', 'deptId'))
            this.spinning = false
            // this.form.setFieldsValue({ ...record })
          })
        })
      }
    },
    onChange (value, label, extra) {
      if (extra.triggerNode.$children.length > 0) {
        this.$message.error('不能选择父节点' + `${label}`)
        this.deptCheck = false
      } else {
        this.deptCheck = true
      }
    },
    loadRoleAll () {
      getRoleAll().then(res => {
        this.roleAll = res.rows
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      if (!this.deptCheck) {
        this.$message.error('不能选择父节点')
        return
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveUser(values).then(res => {
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
