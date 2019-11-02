import INITIAL_STATE from '@/INITIAL_STATE';
import router from '@/router';

export default {
  init ({ rootState, commit }) {
    if(localStorage.state) {
      commit('REPLACE_STATE', JSON.parse(localStorage.state)); 
    } else {
      commit('REPLACE_STATE', INITIAL_STATE);
    }

    if (!rootState.currentList) {
      router.push('/lists');
    }
  },

  updateStorage () {
    localStorage.state = JSON.stringify(this.getters.getState);
  },

};