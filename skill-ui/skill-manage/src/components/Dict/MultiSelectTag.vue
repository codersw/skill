<template>
  <a-checkbox-group v-if="tagType=='checkbox'" :value="arrayValue" :disabled="disabled" @change="onChange">
    <a-checkbox v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text || item.label }}</a-checkbox>
  </a-checkbox-group>

  <a-select
    v-else-if="tagType=='select'"
    :value="arrayValue"
    :disabled="disabled"
    :open="open"
    mode="multiple"
    :placeholder="placeholder"
    :getPopupContainer="(node) => node.parentNode"
    allowClear
    @change="onChange">
    <a-select-option
      v-for="(item,index) in dictOptions"
      :key="index"
      :value="item.value">
      <span style="display: inline-block;width: 100%" :title=" item.text || item.label ">
        {{ item.text || item.label }}
      </span>
    </a-select-option>
  </a-select>

</template>

<script>
  import {getDictItems} from '@/api/system'
  export default {
    name: 'MultiSelectTag',
    props: {
      dictCode: {type: String, default: ''},
      placeholder: {type: String, default: ''},
      disabled: {type: Boolean, default: false},
      value: {type: String, default: undefined},
      type: {type: String, default: 'select'},
      open: {type: Boolean, default: true}
    },
    data () {
      return {
        dictOptions: [],
        tagType: '',
        arrayValue: !this.value ? [] : this.value.split(',')
      }
    },
    created () {
      if (!this.type || this.type === 'list_multi') {
        this.tagType = 'select'
      } else {
        this.tagType = this.type
      }
    },
    watch: {
      dictCode: {
        immediate: true,
        handler () {
          this.initDictData()
        }
      },
      value (val) {
        if (!val) {
          this.arrayValue = []
        } else {
          this.arrayValue = this.value.split(',')
        }
      }
    },
    methods: {
      initDictData () {
          // 根据字典Code, 初始化字典数组
          getDictItems(this.dictCode, null).then((res) => {
            if (res.code === 0) {
              this.dictOptions = res.data
            }
          })
      },
      onChange (selectedValue) {
        this.$emit('change', selectedValue.join(','))
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
