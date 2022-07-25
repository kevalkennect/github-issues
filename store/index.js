import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
    },
    mutations: {
      setPost(state, post) {
        state.posts = post;
      },
    },
    actions: {
      setPost(context, posts) {
        context.commit("setPost", posts);
      },
    },
    getters: {
      getPosts(state) {
        return state.posts;
      },
    },
  });
};

export default createStore;
