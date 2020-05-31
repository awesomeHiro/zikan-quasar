import data from "./data.json";

export default {
  namespaced: true,
  state: () => ({
    meta: data,
  }),
  getters: {
    activeIndex: state => [state.meta.activeIndex][0],
    selectedSectionId: state => [state.meta.selectedSectionId][0],
    selectedSection: (_state, getters, rootState) => {
      return rootState.sections.sections.find(
        section => section.id === getters.selectedSectionId,
      )
    },
  },
  mutations: {
    setActiveIndex(state, index) {
      state.meta.activeIndex = index
    },
    setSelectedSectionId(state, sectionId) {
      state.meta.selectedSection = sectionId
    },
  },
};
