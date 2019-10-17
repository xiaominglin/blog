import Vue from 'vue'
import Vuex from 'vuex'

import login from '@/store/modules/login'
import user from '@/store/modules/user'
import sys from '@/store/modules/sys'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      login,
      user,
      sys
    }
  })