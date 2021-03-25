<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item label="层级">
          <a-select v-model="queryParam.deep" placeholder="请选择">
            <a-select-option :value="''">所有</a-select-option>
            <a-select-option v-for="(d, index) in deeps" :key="index" :value="d.value">{{ d.label }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-model="queryParam.name" placeholder="请输入"/>
        </a-form-item>
        <a-form-item label="上级编号">
          <a-input v-model="queryParam.pid" placeholder="请输入"/>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">{{ 'global.button.new' | i18n }}</a-button>
      <a-dropdown v-if="removeEnable&&selectedRowKeys.length > 0">
        <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">{{ 'global.button.delete' | i18n }}</a-button>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
      defaultSort="createTime"
    >
      <span slot="deep" slot-scope="text">
        {{ text | deepFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">{{ 'global.button.edit' | i18n }}</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" @click="delByIds([record.dictId])">{{ 'global.button.delete' | i18n }}</a>
      </span>
    </s-table>
    <dist-modal ref="modal" :deeps="deeps" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getDistList, delDist } from '@/api/system'
import DistModal from './modules/DistModal.vue'
import { checkPermission } from '@/utils/permissions'
const deepMap = {}

export default {
  name: 'TableList',
  components: {
    STable,
    DistModal
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
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '层级',
          dataIndex: 'deep',
          scopedSlots: { customRender: 'deep' }
        },
        {
          title: '上级名称',
          dataIndex: 'pname'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '拼音',
          dataIndex: 'pinyin'
        },
        {
          title: '拼音缩写',
          dataIndex: 'pinyinShor'
        },
        {
          title: '扩展名',
          dataIndex: 'extName'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          sorter: true
        },
        {
          title: '操作人',
          dataIndex: 'operator'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getDistList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      deeps: [{ value: 0, label: '省' }, { value: 1, label: '市' }, { value: 2, label: '区/县' }],
      addEnable: checkPermission('system:districts:add'),
      editEnabel: checkPermission('system:districts:edit'),
      removeEnable: checkPermission('system:districts:remove')
    }
  },
  filters: {
    deepFilter (type) {
      return deepMap[type].text
    }
  },
  created () {
    this.deeps.map(d => {
      deepMap[d.value] = { text: d.label }
    })
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd (parentId) {
      this.$refs.modal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    dataModal (dictType) {
      this.$refs.datamodal.show(dictType)
    },
    delByIds (ids) {
      delDist({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
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
