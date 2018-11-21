import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const actions = {
  setIsAuthenticated ({ commit }, isAuthenticated) {
    commit('isAuthenticated', isAuthenticated)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
}

const mutations = {
   isAuthenticated(state, isAuthenticated) {
     state.isAuthenticated = isAuthenticated
   },
   setUser(state, user) {
    state.user = user
  }
}

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {}
  },
  actions,
  mutations
})

export default store