export const state = () => ({
  categories: [],
});

export const mutations = {
  initCategories(state, categories) {
    state.categories = [...categories];
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      const categories = await this.$axios.$get(
        "/items/categories?fields=name,slug&sort=-order"
      );
      commit("initCategories", categories.data);
    } catch (error) {
      commit("initCategories", []);
    }
  },
};
