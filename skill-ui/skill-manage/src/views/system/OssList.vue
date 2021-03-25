<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <PageWrapperSearch>
        <a-form-item label="文件名：">
          <a-input v-model="queryParam.fileName" placeholder="请输入"/>
        </a-form-item>
        <a-form-item label="文件后缀：">
          <a-input v-model="queryParam.fileSuffix" placeholder="请输入"/>
        </a-form-item>
        <a-form-item label="上传人：">
          <a-input v-model="queryParam.createBy" placeholder="请输入"/>
        </a-form-item>
        <a-form-item slot="buttons">
          <a-button type="primary" @click="$refs.table.refresh(true)">{{ 'global.button.search' | i18n }}</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ 'global.button.reset' | i18n }}</a-button>
        </a-form-item>
      </PageWrapperSearch>
    </div>
    <div class="table-operator">

      <a-button v-if="configEnabel" type="primary" icon="setting" @click="$refs.modal.config()">{{ 'global.button.ossconfig' | i18n }}</a-button>
      <a-dropdown v-if="removeEnable && selectedRowKeys.length > 0">
        <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">{{ 'global.button.delete' | i18n }}</a-button>
      </a-dropdown>
      <a-upload
        v-if="addEnable"
        name="file"
        :action="uploadUrl"
        :headers="headers"
        :showUploadList="false"
        @change="uploadChange"
      >
        <a-button icon="upload"> {{ 'global.button.uploadfile' | i18n }}</a-button>
      </a-upload>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
      :rangPicker="range"
      defaultSort="createTime"
    >
      <template v-for="col in ['fileName']" :slot="col" slot-scope="text, record">
        <div :key="col ">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id, col, record)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <span slot="service" slot-scope="text">
        {{ text | serviceFilter }}
      </span>
      <img slot="url" slot-scope="text" style="width:30px;heigth:30px;cursor:pointer;" :src="text" @click="handlePreview(text)"/>
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record)">{{ 'global.button.save' | i18n }}</a>
            <a-divider type="vertical" />
            <a-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
              <a>{{ 'global.button.cancel' | i18n }}</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record)">{{ 'global.button.edit' | i18n }}</a>
            <a-divider type="vertical" />
            <a v-if="removeEnable" @click="delByIds([record.id])">{{ 'global.button.delete' | i18n }}</a>
          </span>
        </div>
      </template>
    </s-table>
    <oss-modal ref="modal" @ok="handleOk"/>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-card>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { STable, Ellipsis } from '@/components'
import { getOssList, delOss, saveOss } from '@/api/system'
import { checkPermission } from '@/utils/permissions'
import OssModal from './modules/OssConfigModal'
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    OssModal
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
          title: '文件编号',
          dataIndex: 'id'
        },
        {
          title: '文件名',
          dataIndex: 'fileName',
          scopedSlots: { customRender: 'fileName' }
        },
        {
          title: '文件后缀',
          dataIndex: 'fileSuffix'
        },
        {
          title: '文件预览',
          dataIndex: 'url',
          scopedSlots: { customRender: 'url' }
        },

        {
          title: '上传人',
          dataIndex: 'createBy'
        },
        {
          title: '服务商',
          dataIndex: 'service',
          scopedSlots: { customRender: 'service' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      range: null,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getOssList(Object.assign(parameter, this.queryParam)).then(res => {
          return res
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      previewVisible: false,
      uploadUrl: process.env.VUE_APP_API_BASE_URL + '/system/oss/upload',
      headers: {
        token: storage.get(ACCESS_TOKEN)
      },
      addEnable: checkPermission('system:oss:add'),
      editEnabel: checkPermission('system:oss:edit'),
      configEnabel: checkPermission('system:oss:config'),
      removeEnable: checkPermission('system:oss:remove')

    }
  },
  filters: {
    serviceFilter (service) {
      const serviceMap = {
        1: '七牛云',
        2: '阿里云',
        3: '腾讯云'
      }
      return serviceMap[service]
    }
  },
  beforeCreate () {

  },
  created () {
  },
  methods: {
    previewCancel () {
      this.previewVisible = false
    },
    handlePreview (url) {
      this.previewImage = url
      this.previewVisible = true
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    uploadChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$refs.table.refresh(true)
      }
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column] = value
    },
    edit (record) {
      record.editable = true
    },
    cancel (record) {
      record.editable = false
    },
    save (record) {
      saveOss(record).then(res => {
        if (res.code === 0) {
          this.$message.success(this.$t('global.message.save.success'))
          record.editable = false
        } else {
          this.$message.success(res.msg)
        }
      }).catch(() => {
        this.$message.success(this.$t('global.message.error'))
      })
    },
    delByIds (ids) {
      delOss({ ids: ids.join(',') }).then(res => {
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
