import hash from '@/utilities/hash';

export default {
  REPLACE_STATE(state, newState) {
    state.currentList = newState.currentList;
    state.lists = { ...newState.lists };
    state.categories = {...newState.categories};
  }
};