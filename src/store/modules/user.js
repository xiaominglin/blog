import { login } from '@/api/user'
//import { resolve } from 'path';

const state = {
    name: '',
    token: ''
}

const getters = {
    test(state) {
        return state.name
    }
}

const mutations = {
    'SET_TOKEN' : (state, token) => {
        state.token = token
    },
    'SET_NAME' : (state, name) => {
        state.name = name
    }
}

const actions = {
    login({ commit }, userInfo) {
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
            login(username, userInfo.password).then(response => {
            const data = response.data
            //console.log("=-="+ console.log(JSON.stringify(data)));
            //Cookies.set('Token', response.data.token) //登录成功后将token存储在cookie之中
            commit('SET_TOKEN', data.token)
            resolve()
          }).catch(error => {
            reject(error)
          });
        });
      }
      
}

export default {
    state,
    getters,
    mutations,
    actions
}