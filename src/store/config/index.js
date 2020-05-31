import data from "./data.json";

export default {
  namespaced: true,
  state: () => ({
    config: data
  }),
};
