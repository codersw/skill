<template>
  <a-radio-group v-if="tagType=='radio'" :value="getValueSting" :disabled="disabled" @change="handleInput">
    <a-radio v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text }}</a-radio>
  </a-radio-group>
  <a-select
    v-else-if="tagType=='select'"
    allowClear
    :placeholder="placeholder"
    :value="getValueSting"
    :options="dictOptions"
    :show-search="searchabled"
    :getPopupContainer="(node) => node.parentNode"
    option-filter-prop="children"
    @change="handleInput">
    <!-- <a-select-option value="">请选择</a-select-option>
    <a-select-option v-for="(item, key) in dictOptions" :key="key" :value="item.value">
      <span style="display: inline-block;width: 100%" :title=" item.text || item.label ">
        {{ item.text || item.label }}
      </span>
    </a-select-option> -->
  </a-select>
</template>

<script>
import {getDictItems} from '@/api/system'
export default {
  name: 'DictSelectTag',
  props: {
    dictCode: {type: String, default: ''},
    placeholder: {type: String, default: ''},
    triggerChange: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    value: {type: String, default: undefined},
    type: {type: String, default: 'select'},
    searchabled: {type: Boolean, default: false}
  },
  data () {
    return {
      dictOptions: [],
      tagType: ''
    }
  },
  watch: {
    dictCode: {
      immediate: true,
      handler () {
        this.initDictData()
      }
    }
  },
  created () {
    // console.log(this.dictCode)
    this.tagType = this.type
    // 获取字典数据
    // this.initDictData();
  },
  computed: {
    getValueSting () {
      return this.value ? this.value : undefined
    }
  },
  methods: {
    initDictData () {
      // 根据字典Code, 初始化字典数组
      getDictItems(this.dictCode, null).then((res) => {
        if (res.code === 0) {
          if (this.tagType === 'select') {
            this.dictOptions = [{value: undefined, label: '请选择'}, ...res.data]
          } else {
            this.dictOptions = [...res.data]
          }
        }
      })
    },
    handleInput (e) {
      let val
      if (this.tagType === 'radio') {
        val = e.target.value
      } else {
        val = e
      }
      if (this.triggerChange) {
        this.$emit('change', val)
      } else {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>
</style>