<template>
  <div class="components-input-demo-presuffix">
    <a-input v-model="cron" :placeholder="this.$t('job.cronExpression')" @click="openModal" @change="handleOK">
      <a-icon slot="prefix" type="schedule" :title="this.$t('job.corn.control')"/>
      <a-icon v-if="cron" slot="suffix" type="close-circle" :title="this.$t('global.button.clear')" @click="handleEmpty"/>
    </a-input>
    <CronModal ref="innerVueCron" :data="cron" @ok="handleOK"></CronModal>
  </div>
</template>
<script>
  import CronModal from './CronModal'
  export default {
    name: 'Cron',
    components: {
      CronModal
    },
    props: {
      value: {
        required: false,
        type: String,
        default: () => {
          return '* * * * * ? *'
        }
      }
    },
    data () {
      return {
        cron: this.value
      }
    },
    watch: {
      value (val) {
        this.cron = val
      }
    },
    methods: {
      openModal () {
        this.$refs.innerVueCron.show()
      },
      handleOK (val) {
        this.cron = val
        this.$emit('change', this.cron)
        // this.$emit("change", Object.assign({},  this.cron));
      },
      handleEmpty () {
        this.handleOK('')
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
<style scoped>
  .components-input-demo-presuffix .anticon-close-circle {
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s;
    font-size: 12px;
  }
  .components-input-demo-presuffix .anticon-close-circle:hover {
    color: #f5222d;
  }
  .components-input-demo-presuffix .anticon-close-circle:active {
    color: #666;
  }
</style>