<template>
  <div class="load">
    <div class="title">
      <div class="logo"></div>
      <div class="word">{{ 'app.model.drawer.management.data' | i18n }}</div>
      <a-progress :percent="progressBar" class="progress-bar" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'UnitComponentsProgressBar',
  props: {
    progressBar: [Number, String] // 进度条加载
  }
  // data () {
  //   return {
  //     progressBar: '88o' // 进度条加载
  //   }
  // }
  // created () {
  //   this.load()
  // },
  // methods: {
  //   // 进度条加载
  //   load () {
  //     if (this.progressBar > 100) {
  //       // 切换页面
  //       return
  //     }
  //     this.progressBar++
  //     setTimeout(this.load, 1000)
  //   }
  // }
}
</script>
<style lang="less" scoped>
.load {
  display: flex;
  position: relative;
  width: 100%;
  background-image: url('~@/assets/model/load.jpg');
  background-position: center;
  background-size: cover;
  height: 100%;
  .title {
    position: absolute;
    width: 100%;
    top: 20%;
    text-align: center;
    .logo {
      margin: 0 auto 35px;
      width: 100px;
      height: 100px;
      background-image: url('~@/assets/model/logo.png');
      background-size: 100%;
      background-repeat: no-repeat
    }
    .word {
      font-size: 28px;
      color: #0077ff;
    }
  }
  .progress-bar {
    top: 120px;
    margin: auto;
    width: 36%;
    /deep/.ant-progress-bg {
      background-color :#0077ff
    }
  }
}
</style>