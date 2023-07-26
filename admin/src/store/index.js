import { createStore } from 'vuex'

export default createStore({
  state: {
    isGetterRouter: false,
    isMenuCollapsed:true
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value;
    },
    changeMenuCollapsed(state) {
      console.log(state.isMenuCollapsed);
      state.isMenuCollapsed = !state.isMenuCollapsed;
    }
  },
  actions: {
  },
  modules: {
  }
})
