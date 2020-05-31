import data from "./data.json";

export default {
  namespaced: true,
  state: () => ({
    sections: data,
  }),
  getters: {
    byId: state => id => {
      return state.sections.find(x => x.id === id) || { name: "" };
    },
    sections: state => {
      return state.sections;
    },
  },
};
