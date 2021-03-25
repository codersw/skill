<template>
  <div class="no-permission-wrap">
    <img class="no-permission-img" src="../../../assets/imgs/home-nopermission.png"/>
    <div v-if="type==='disable'" class="no-permission-title">{{ 'global.message.warning.user.disable.msg' | i18n }}</div>
    <div v-else class="no-permission-title">{{ 'layouts.user.nopermission' | i18n }}</div>
    <a-button
      type="primary"
      htmlType="submit"
      class="no-permission-button-logout"
      @click.prevent="handleLogout">{{ 'logout' | i18n }}</a-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NoPermission',
  props: {
    type: {
      type: String,
      default: 'noPermission'
    }
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout (e) {
      this.$confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
           this.$router.replace({path: '/user/login'})
          // return this.Logout({})
          //   .then(() => {
          //     this.$router.replace({path: '/user/login'})
          //     setTimeout(() => {
          //       window.location.reload()
          //     }, 100)
          //   })
          //   .catch(err => {
          //     this.$message.error({
          //       title: this.$t('global.message.error'),
          //       description: err.message
          //     })
          //   })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.no-permission-wrap {
  text-align: center;
  .no-permission-img {
    display: block;
    margin: 6% auto 0;
    width: 19.7vw;
  }
  .no-permission-title {
    margin-top: 5%;
    font-size: 1.95vw;
    color: #999;
  }
  .no-permission-button-logout {
    margin-top: 3%;
    padding: 1.3% 2.6%;
    line-height: 0;
    font-size: 1vw;
    background-color: rgba(24, 144, 255, 1);
  }
}
</style>
