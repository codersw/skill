<template>
  <div>
    <a-row :gutter="gutterGutter">
      <a-col :span="5">
        <a-card :bordered="false" class="content-container auto">
          <search-tree
            :treeData="deptTree"
            :dataList="dataList"
            :expandedKeys="expandedKeys"
            :holderText="holderText"
            @select="handleSelect"
          >
          </search-tree>
        </a-card>
      </a-col>
      <a-col :span="19">
        <a-card :bordered="false" class="content-container">
          <div class="table-page-search-wrapper">
            <PageWrapperSearch>
              <a-form-item :label="this.$t('user.loginName')">
                <a-input v-model="queryParam.loginName" :placeholder="this.$t('user.loginName')"/>
              </a-form-item>
              <a-form-item :label="this.$t('user.status')">
                <a-select v-model="queryParam.status" :placeholder="this.$t('user.status')" >
                  <a-select-option :value="''">全部</a-select-option>
                  <a-select-option :value="'0'">正常</a-select-option>
                  <a-select-option :value="'1'">禁用</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item slot="buttons">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
              </a-form-item>
            </PageWrapperSearch>
          </div>
          <div class="table-operator">
            <!-- <a-button type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0"> -->
            <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">{{ 'global.button.new' | i18n }}</a-button>
            <!-- <a-dropdown v-if="removeEnable&& selectedRowKeys.length > 0"> -->
            <!-- <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <a-menu-item key="2"><a-icon type="lock" />禁用</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button> -->
            <!-- <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">{{ 'global.button.delete' | i18n }}</a-button> -->
            <!-- </a-dropdown> -->
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="userId"
            :columns="columns"
            :data="loadData"
            :scroll="{ y: tableHeight }"
            defaultSort="createTime"
          >
            <span slot="status" slot-scope="text,record">
              <a-switch :checked="record.status=='0'" @change="onChangeStatus(record)"/>
            </span>
            <span slot="action" slot-scope="text, record">
              <a v-if="editEnabel" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
              <!-- <a-divider type="vertical" />
              <a v-if="removeEnable" @click="delByIds([record.userId])">{{ 'global.button.delete' | i18n }}</a> -->
              <a-divider v-if="!isProd" type="vertical" />
              <a v-if="!isProd" @click="resetPwd(record)">{{ 'global.button.resetpassword' | i18n }}</a>
            </span>
          </s-table>
        </a-card>
      </a-col>
    </a-row>
    <user-modal ref="modal" :deptTree="deptTree" @ok="handleOk"/>
    <user-pwd-modal ref="pwdmodal"/>
  </div>
</template>

<script>
import { STable, SearchTree } from '@/components'
import { getUserList, getDeptListEnable, delUser, changUserStatus } from '@/api/system'
import UserModal from './modules/UserModal'
import UserPwdModal from './modules/UserPwdModal'
import pick from 'lodash.pick'
import { checkPermission } from '@/utils/permissions'
export default {
  name: 'UserList',
  components: {
    SearchTree,
    STable,
    UserModal,
    UserPwdModal
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
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam))
      },
      tableHeight: 0,
      deptTree: [],
      expandedKeys: [],
      dataList: [],
      holderText: this.$t('user.dept.search'),
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('system:user:add'),
      editEnabel: checkPermission('system:user:edit'),
      resetPwdEnabel: checkPermission('system:user:resetPwd'),
      removeEnable: checkPermission('system:user:remove')
    }
  },
  mounted () {
    window.addEventListener('resize', this.setTableHeight, false)
    this.setTableHeight()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setTableHeight)
  },
  created () {
    getDeptListEnable().then(res => {
      const data = res.rows
      if (data.length > 0) {
        const min = Math.min(...data.map(m => m.parentId))
        this.buildtree(data, this.deptTree, min)
        console.log(this.deptTree)
        this.expandedKeys = data.map(m => m.parentId)
        this.dataList = data.map(m => {
          return { key: m.deptId, title: m.deptName }
        })
      }
    })
  },
  methods: {
    setTableHeight () {
      this.tableHeight = document.documentElement.clientHeight - 89 - 40 - this.gutterGutter * 3 - 65 - 15 - 56 - 47 - 55
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    resetPwd (record) {
      this.$refs.pwdmodal.edit(record)
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk () {
      this.$refs.table.refresh()
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delUser({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          // this.$message.success(`删除成功`)
          this.$message.success(this.$t('global.message.delete.success'))
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        // const difference = new Set(this.selectedRowKeys.filter(x => !new Set(ids).has(x)))
        // this.selectedRowKeys = Array.from(difference)
        this.selectedRowKeys = []
      })
    },
    onChangeStatus (record) {
      record.status = record.status === '0' ? '1' : '0'
      changUserStatus(pick(record, 'userId', 'status')).then(res => {
        if (res.code === 0) {
          this.$message.success(this.$t('global.message.save.success'))
        } else {
          this.$message.error(res.msg)
        }
      })
      // 发送状态到服务器
    },
    buildtree (list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          const child = {
            key: item.deptId,
            value: item.deptId, // value是给modal的select用的，2者属性不一样
            title: item.deptName,
            scopedSlots: { title: 'title' },
            children: []
          }
          this.buildtree(list, child.children, item.deptId)
          if (child.children.length === 0) { delete child.children }
          arr.push(child)
        }
      })
    },
    // 下面是树相关方法
    handleSelect (selectedKeys, info) {
      this.queryParam = {
        deptId: selectedKeys[0]
      }
      this.$refs.table.refresh(true)
    }
  },
  computed: {
     // 表头
      columns () {
        return [
          {
            title: this.$t('user.loginName'),
            dataIndex: 'loginName'
          },
          {
            title: this.$t('user.userName'),
            dataIndex: 'userName'
          },
          {
            title: this.$t('user.list.status'),
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: this.$t('user.createTime'),
            dataIndex: 'createTime',
            sorter: true
          }, {
            title: this.$t('global.action'),
            width: '160px',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ]
      }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.content-container {
  height: calc(100vh - 89px - @layout-header-height - @gutter * 2);
  overflow: hidden;
  &.auto {
    overflow: auto;
  }
}
</style>
