<template>
  <a-modal
    v-if="visible"
    :title="this.$t('global.action')"
    style="top: 20px;"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form">

      <a-form-item style="display:none">
        <a-input v-decorator="['roleId']"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('role.roleName')"
      >
        <a-input
          v-decorator="[
            'roleName',
            {
              rules: [{ required: true, message: this.$t('role.roleName.msg') }]
            }
          ]"
          :placeholder="this.$t('role.roleName')"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('role.roleKey')"
      >
        <a-input
          v-decorator="['roleKey',{rules: [{ required: true, message: this.$t('role.roleKey.msg') }]}]"
          :placeholder="this.$t('role.roleKey')"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('role.roleSort')"
      >
        <a-input
          v-decorator="['roleSort',{rules: [{ required: true, message: this.$t('role.roleSort.msg') }]}]"
          :placeholder="this.$t('role.roleSort')"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('role.status')"
      >
        <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: this.$t('role.status.msg') }]}]">
          <a-select-option :value="'0'">正常</a-select-option>
          <a-select-option :value="'1'">禁用</a-select-option>
        </a-select>
      </a-form-item>

      <a-divider />
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="this.$t('role.permissions')"
      >

        <!-- v-decorator="['parentId',{initialValue:'0'}]" -->
        <!-- <a-tree
          checkable
          autoExpandParent
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          v-model="checkedKeys"
          @select="onSelect"
          @check="onCheck"
          :selectedKeys="selectedKeys"
          :checkedKeys="checkedKeys"
          :treeData="permissions"
        > -->
        <a-tree
          v-model="checkedKeys"
          checkable
          :treeData="permissions"
          @check="onCheck"
        >
        </a-tree>
      </a-form-item>
    </a-form>

  </a-modal>
</template>

<script>
import { getPermissions, getRolePermIds, saveRole } from '@/api/system'
import pick from 'lodash.pick'

export default {
  name: 'RoleModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},

      form: this.$form.createForm(this),
      permissions: [],
      treeCheck: false,
      pidSet: [],
      checkedKeys: [],
      halfCheckedKeys: []
    }
  },
  created () {
    // this.loadPermissions()
  },
  methods: {
    add () {
      this.form.resetFields()
      this.checkedKeys = []
      this.pidSet = []
      this.edit({ })
    },
    edit (record) {
      this.loadPermissions()
      if (record.roleId) {
        getRolePermIds(record.roleId).then(res => {
          const pidSet = new Set(res.map(m => m.parentId).filter(id => id > 0))
          this.pidSet = pidSet
          // 因为antd 树插件勾选父节点会导致所有子节点选中,所以过滤所有父节点
          this.checkedKeys = res.map(m => m.menuId).filter(id => !pidSet.has(id))
        })
      }
      this.mdl = Object.assign({}, record)
      // 如果没有check过，半选节点是拿不到的，只能通过预先设置的pidSet获取
      this.treeCheck = false
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'roleId', 'roleName', 'status', 'roleSort', 'roleKey'))
        // this.form.setFieldsValue(...record)
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    onExpand (expandedKeys) {
      // console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys, info) {
      if (!this.treeCheck) this.treeCheck = true
      // console.log('onCheck', info)
      this.checkedKeys = checkedKeys
      this.halfCheckedKeys = info.halfCheckedKeys
    },
    onSelect (selectedKeys, info) {
      // console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    loadPermissions () {
      getPermissions().then(res => {
        this.permissions = []
        this.buildtree(res.rows, this.permissions, 0)
      })
    },
    buildtree (list, permissions, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          const child = {
            key: item.menuId,
            title: this.$t(item.menuName),
            children: []
          }
          this.buildtree(list, child.children, item.menuId)
          permissions.push(child)
        }
      })
    },
    handleOk (e) {
      // 如果没有check过，半选节点是拿不到的，只能通过预先设置的pidSet获取
      const checkedAll = this.treeCheck ? this.checkedKeys.concat(this.halfCheckedKeys) : this.checkedKeys.concat(Array.from(this.pidSet))
      if (!checkedAll.length > 0) {
        this.$message.warning(this.$t('role.permissions.msg'))
        return
      }
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          values.menuIds = checkedAll
          this.confirmLoading = true
          saveRole(Object.assign(values)).then(res => {
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
    },
    handleCancel () {
      this.visible = false
    }

  }

}
</script>

<style scoped>

</style>
