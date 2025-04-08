import Vuex from 'vuex';
import api from '../api';

const store = new Vuex.Store({
  state: {
    isFetched: false,
    email: '',
    points: 20000,
    Face: '',
    User: {
      hasLoginReward: false,
      profile: {
        email: "",
        image: ""
      },
      score: {
        pinball: {
          lastScore: 0, // 上次遊戲分數
          updatedAt: 0 // 上次分數更新時間
        },
        rythem: {
          lastScore: null,
          updatedAt: null
        },
        login: {
          week: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null, // 週幾的登入獎勵時間
            6: null
          },
          lastScore: 0, // 上次登入獎勵是多少
          updatedAt: 0 // 上次給登入獎勵時間
        },
        total: 0, // 目前總積分
        updatedAt: 0
      }
    },
  },
  getters: {
    getIsFetched: (state) => state.isFetched,
    getName: (state) => !!state.User.profile.email ? state.User.profile.email.split('@')[0] : '',
    getEmail: (state) => state.User.profile.email,
    getHasEmail: (state) => !!state.User.profile.email,
    getUser: (state) => state.User,
    getFace: (state) => state.User.profile.image,
    getScore: (state) => (type) => state.User.score[type] || {},
    getWeek: (state) => state.User.score.login.week,
  },
  mutations: {
    setPoints(state, point) {
      state.point = point;
    },
    addPoints(state, point) {
      state.points += point;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setUser(state, User) {
      state.User = User;
      state.isFetched = true;
    }
  },
  actions: {
    async GET_USER({ commit, dispatch }) {
      const email = atob(localStorage.getItem('e') || '');
      if (!email) return
      const User = await api('/login', { email });
      if (!User.error) {
        commit('setUser', User.res);
      } else {
        localStorage.removeItem('e');
      }
    }
  }
});

export default store;
