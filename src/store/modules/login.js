const state  = {
    token : ''
}

const getters = {
    getToken : state => {
        return state.token;
    } 
}

const mutations = {
    setToken ( state, token) {
        state.token = token
    }
}

const actions = {
    doToken ( { commit } ) {
        commit('setToken')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}