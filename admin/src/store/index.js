import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    reportMessage: {}
  },
  mutations: {
    ADD_REPORT: (state, payload) => {
      state.reportMessage = payload
    },
  }
})

export default store
