import { winFoData,doWebInfo,slide,updateTableData,addSlideInfo,editSlideInfo } from '@/api/sys'

const state = {
    site_name: '',
    site_gwa: '',
    site_analytics: '',
    site_seo_title: '',
    site_seo_keywords: '',
    site_seo_description: '',
    slide : [],
    delSlide : {},
    addSlideInfo : {},
    editSlideInfo : {}
}

const getters = {

}

const mutations = {
   doInit(state,data){
        state.site_name = data.site_name,
        state.site_gwa = data.site_gwa,
        state.site_analytics = data.site_analytics,
        state.site_seo_title = data.site_seo_title,
        state.site_seo_keywords = data.site_seo_keywords,
        state.site_seo_description = data.site_seo_description
   },
   doSlide(state,data) {
     state.slide = data;
   },
   doUpdateSlide(state,data) {
    state.delSlide = data;
  },
  addSlideInfo(state,data) {
    state.addSlideInfo = data;
  },
  editSlideInfo(state,data) {
    state.editSlideInfo = data;
  }
}

const actions = {
    winFoData({ commit }) {
        return new Promise((resolve, reject) => {
            winFoData().then(response => {
            const data = response.data
            commit('doInit',data);
            resolve()
          }).catch(error => {
            reject(error)
          });
        });
      },
      doWebInfo({ commit },formName) {
        return new Promise((resolve, reject) => {
          doWebInfo(formName).then(response => {
            const data = response.data
            commit('doInit',data);
            resolve()
          }).catch(error => {
            reject(error)
          });
        });
      },
      slide({ commit },formName) {
        return new Promise((resolve, reject) => {
          slide(formName).then(response => {
            const data = response.data
            commit('doSlide',data);
            resolve()
          }).catch(error => {
            reject(error)
          });
        });
      },
      updateTableData({ commit },formName) {
        return new Promise((resolve, reject) => {
          updateTableData(formName).then(response => {
            const data = response.data
            commit('doUpdateSlide',data);
            resolve()
          }).catch(error => {
            reject(error)
          });
        });
      },
      editSlideInfo({ commit },formName) {
        return new Promise((resolve, reject) => {
          editSlideInfo(formName).then(response => {
            const data = response.data
            commit('editSlideInfo',data);
            resolve()
          }).catch(error => {
            reject(error)
          });
        });
      },
      createNewSlide({ commit }, data) {
        return new Promise((resolve, reject) => {
          addSlideInfo(data).then(response => {
            const data = response.data
            commit('addSlideInfo',data);
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