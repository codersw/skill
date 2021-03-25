const modal = {
  state: {
    dataCenterId: '',
    routesKeepAlive: []
  },

  mutations: {
    SET_DATACENTER_ID: (state, id) => {
      state.dataCenterId = id
    },
    UPDATE_ROUTES_KEEP_ALIVE: (state, arr) => {
      state.routesKeepAlive = arr
    }
  },

  actions: {
    // 登录
    SetDataCenterId ({ commit }, id) {
      return new Promise((resolve) => {
        commit('SET_DATACENTER_ID', id)
        resolve(id)
      })
    }

  }
}

export default modal
