import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adduserinput:true
  },
  mutations: {
    changeadduserinput(state){
      this.state.adduserinput=!this.state.adduserinput
    }
  },
  actions: {
  },
  modules: {
  }
})
