<template>
  <div class="container">
    <!-- <div class="search-container">
      <vue-particles
        class="search-container-particles"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      />
      <a-row type="flex" class="search-title" align="middle" justify="center">{{ 'app.setting.title' | i18n }}</a-row>
    </div> -->
    <no-permission v-if="!hasPermission" :type="type"/>
  </div>
</template>

<script>
import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
import NoPermission from './components/NoPermission'
import data from '../unit/assets/js/data'
export default {
  name: 'HomeNoPermission',
  components: {
    'vue-particles': VueParticles,
    NoPermission
  },
  data () {
    return {
      type: this.$route.query.type
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  position: relative;
  margin: -@gutter;
  padding: 76px 0 26px 0;
  font-size: 36px;
  color: #fff;
  background: #2c2d44;
  background-image: linear-gradient(45deg, #3f3251 2%, #002025 100%);
  &-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .search-title {
    padding-bottom: 27px;
  }
}
</style>
