import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";  

// 实现数据持久化
export default createStore({
  state: {
    isGetterRouter: false,
    isMenuCollapsed:true,
    userInfo:{}
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
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      };
    },
    clearUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState({paths: ['isMenuCollapsed','userInfo']})
  ]
})
