import data from "./data.json";

export default {
  namespaced: true,
  state: () => ({
    projects: data,
  }),
  getters: {
    byId: state => id => {
      return state.projects.find(x => x.id === id) || { name: '' }
    },
  },
};
