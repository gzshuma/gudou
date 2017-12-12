import Vue from 'vue'
import Vuex from 'vuex'
// import user from './user'
import player from './models/player'
import userData from './models/userData'
import select from './models/select'
Vue.use(Vuex)

const state = {
  // user: ''
}

const getters = {
}

const mutations = {
  // isLogin (state,user) {
  //   state.user = user
  // }
}

const actions = {

}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		// user,
		player,
		userData,
		select
	}
})
