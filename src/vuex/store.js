import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const actions = {

}

const mutations = {

}

const state ={
   searchText: "",
}

// 创建，导出store
export default new Vuex.Store({
  state,
  mutations,
  actions
})