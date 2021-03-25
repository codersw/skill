<template>
  <a-modal
    v-if="visible"
    v-model="visible"
    :title="'app.system.table.action' | i18n"
    style="top: 20px;"
    :width="800"
    @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['menuId']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.form.parentPermission' | i18n">
        <a-tree-select
          v-decorator="['parentId', {rules: [{ required: true, message: $t('global.form.placeholder.select.parentPermission') }]}]"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="permissions"
          :placeholder="'app.system.form.parentPermission' | i18n"
          treeDefaultExpandAll
        >
          <template slot="title" slot-scope="{ name }">{{ name | i18n }}</template>
        </a-tree-select>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.form.menuType' | i18n">
        <a-select
          v-decorator="['menuType', {initialValue:'M',rules: [{ required: true, message: $t('global.form.placeholder.select.type') }]}]"
          @select="menuTypeChange"
        >
          <a-select-option :value="'M'">{{ 'app.system.table.catalogue' | i18n }}</a-select-option>
          <a-select-option :value="'C'">{{ 'app.system.table.menu' | i18n }}</a-select-option>
          <a-select-option :value="'F'">{{ 'app.system.table.button' | i18n }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.table.permissionName' | i18n">
        <a-input
          v-decorator="['menuName',{rules: [{ required: true, message: $t('global.form.placeholder.input.permissionName') }]}]"
          :placeholder="'app.system.form.createName' | i18n"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.table.route' | i18n">
        <a-input
          v-decorator="['menuKey',{initialValue:'',rules: [{ required: false, message: $t('global.form.placeholder.input.uniqueKey') }]}]"
          :placeholder="'global.form.placeholder.input.uniqueKeyAs' | i18n"
        />
      </a-form-item>

      <a-form-item v-show="menuType!='M'" :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.table.permissionIdentification' | i18n">
        <a-input
          v-decorator="['perms',{rules: [{ required: false, message: $t('global.form.placeholder.input.permissionIdentification') }]}]"
          :placeholder="'app.system.table.permissionIdentification' | i18n"
        />
      </a-form-item>

      <a-form-item v-show="menuType!=='F'" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          {{ 'app.system.table.widget' | i18n }}
          <a-tooltip :title="'app.system.form.tip.widget' | i18n">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="['component',{rules: [{ required: false, message: $t('global.form.placeholder.input.widget') }]}]"
          :placeholder="'app.system.table.widget' | i18n"
        />
      </a-form-item>

      <a-form-item v-show="menuType!=='F'" :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.form.icon' | i18n">
        <a-input
          ref="iconInput"
          v-decorator="['icon',{rules: [{ required: false, message: $t('global.form.placeholder.select.icon') }]}]"
          :enterButton="'global.form.placeholder.select.icon' | i18n"
          :placeholder="'global.form.placeholder.select.icon' | i18n"
          @click="iconselect()"
        >
          <a-icon slot="prefix" :type="icon" />
          <a-icon slot="suffix" type="close-circle" @click="emitEmpty" />
        </a-input>
      </a-form-item>

      <a-form-item v-show="menuType==='C'" :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.form.openType' | i18n">
        <a-select
          v-decorator="['target', {initialValue:'',rules: [{ required: false, message: $t('global.form.placeholder.select.openType') },{validator: validatePathTarget}]}]"
        >
          <a-select-option :value="''">{{ 'app.system.form.cuurentWindow' | i18n }}</a-select-option>
          <a-select-option :value="'_blank'">{{ 'app.system.form.newWindow' | i18n }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-show="menuType==='C'" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          {{ 'app.system.form.link' | i18n }}
          <a-tooltip :title="'app.system.form.tip.link' | i18n">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="['path',{
            rules: [
              { required: false,type:'string', message: $t('global.form.placeholder.input.path') }
            ]
          }]"
          :placeholder="'global.form.placeholder.input.path' | i18n"
        />
      </a-form-item>

      <a-form-item
        v-show="menuType!=='F'"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="'app.system.form.redirect' | i18n"
      >
        <a-input
          v-decorator="['redirect',{rules: [{ required: false, message: $t('global.form.placeholder.input.redirect') }]}]"
          :placeholder="'app.system.form.redirect' | i18n"
        />
      </a-form-item>

      <a-form-item
        v-show="menuType!=='F'"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="'app.system.form.hideSubmenu' | i18n"
      >
        <a-switch v-decorator="['hiddenChildren',{initialValue:false,valuePropName:'checked'}]" />
      </a-form-item>

      <a-form-item v-show="menuType!=='F'" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          {{ 'app.system.form.hideHeader' | i18n }}
          <a-tooltip :title="'app.system.form.tip.hideHeader'| i18n">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-switch v-decorator="['hiddenHeader',{initialValue:false,valuePropName:'checked'}]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.form.sort' | i18n">
        <a-input-number
          v-decorator="['orderNum',{initialValue:'1',rules: [{ required: true, message: $t('global.form.placeholder.input.sortNumber') }]}]"
          :placeholder="'app.system.form.sort' | i18n"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="'app.system.table.status' | i18n">
        <a-select
          v-decorator="['visible', {initialValue:'0',rules: [{ required: true, message: $t('global.form.placeholder.status') }]}]"
        >
          <a-select-option :value="'0'">{{ 'app.system.table.show' | i18n }}</a-select-option>
          <a-select-option :value="'1'">{{ 'app.system.table.hide' | i18n }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <iconSelector-modal ref="modal" :icon="icon" @ok="setIcon" />
  </a-modal>
</template>
<script>
import { getPermissions, savePerm } from '@/api/system'
import pick from 'lodash.pick'
import IconSelectorModal from './IconSelectorModal.vue'
export default {
  name: 'UserModal',
  components: {
    IconSelectorModal
  },
  data () {
    return {
      description:
        '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      permissions: [{ key: 0, value: '0', name: 'global.form.placeholder.select.none', scopedSlots: {title: 'title'} }],
      mdl: {},
      icon: 'smile',
      menuType: '',
      form: this.$form.createForm(this)
    }
  },
  // watch: {
  //   '$store.getters.lang' () {
  //     console.log('$store.getters.lang')
  //     this.loadPermissions()
  //   }
  // },
  beforeCreate () {},
  created () {
    // this.loadPermissions()
  },
  methods: {
    menuTypeChange (type) {
      this.menuType = type
    },
    emitEmpty () {
      this.$refs.iconInput.focus()
      this.form.setFieldsValue({ icon: '' })
    },
    iconselect () {
      this.$refs.modal.show()
    },
    setIcon (icon) {
      this.icon = icon
      this.form.setFieldsValue({ icon: icon })
    },
    add (parentId) {
      this.form.resetFields()
      this.edit({ parentId: parentId || '0' })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.menuType = this.mdl.menuType || 'M'
      this.$nextTick(() => {
        this.mdl.icon ? (this.icon = this.mdl.icon) : (this.icon = 'smile')
        this.mdl.parentId += ''
        this.form.setFieldsValue(
          pick(
            this.mdl,
            'icon',
            'menuId',
            'parentId',
            'menuType',
            'visible',
            'perms',
            'target',
            'orderNum',
            'menuName',
            'menuKey',
            'component',
            'path',
            'redirect',
            'hiddenChildren',
            'hiddenHeader'
          )
        )
        // this.form.setFieldsValue({ ...record })
      })
      this.permissions =
      [
        { key: 0,
          value: '0',
          name: 'global.form.placeholder.select.none',
          scopedSlots: {title: 'title'}
         }
      ]
       this.loadPermissions()
    },
    validatePathTarget (rule, value, callback) {
      const path = this.form.getFieldValue('path')
      if (path && path.startsWith('http') && value !== '_blank') {
        callback(new Error('链接地址为外链时，打开方式必须为新窗口（antd限制）'))
      } else {
        callback()
      }
    },
    loadPermissions () {
      getPermissions().then(res => {
        this.buildtree(res.rows, this.permissions, 0)
      })
    },
    buildtree (list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          const child = {
            key: item.menuId,
            value: item.menuId + '',
            name: item.menuName,
            // title: this.$t(item.menuName),
            scopedSlots: {
              // custom title
              title: 'title'
            },
            children: []
          }
          this.buildtree(list, child.children, item.menuId)
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
          savePerm(values)
            .then(res => {
              if (res.code === 0) {
                this.$message.success(this.$t('global.message.save.success'))
                this.$emit('ok')
                this.visible = false
              } else {
                this.$message.success(res.msg)
              }
            })
            .catch(() => {
              this.$message.success(this.$t('global.message.error'))
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    }
  }
}
</script>
