<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="">Basin</a>
    </template>
    <!-- <template v-slot:copyright>
      <a href="https://www..com" target="_blank"></a>
    </template> -->
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
