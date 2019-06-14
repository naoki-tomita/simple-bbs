import Vue from "vue";
import Vuex from "vuex";
import { firestore } from "firebase";

Vue.use(Vuex);

export interface ThreadType {
  id: string;
  name: string;
}
export interface ContentType {
  id: string;
  contributor: string;
  content: string;
}

interface State {
  threads: ThreadType[];
  contents: ContentType[];
}

export default new Vuex.Store<State>({
  state: {
    threads: [],
    contents: []
  },
  getters: {
    threads(state) {
      return state.threads;
    },
    contents(state) {
      return state.contents;
    }
  },
  mutations: {
    setThreads(state, threads: ThreadType[]) {
      state.threads = threads;
    },
    setCurrentContents(state, contents: ContentType[]) {
      state.contents = contents;
    }
  },
  actions: {
    selectThread({ commit }, thread: ThreadType) {
      commit("setCurrentThread", thread);
    },
    setFetchedThreads({ commit }, threads: ThreadType[]) {
      commit("setThreads", threads);
    },
    addThread(_, name: string) {
      firestore()
        .collection("threads")
        .add({ name, updatedAt: Date.now() });
    },
    async updateThread(_, thread: string) {
      const { name } = (await firestore()
        .collection("threads")
        .doc(thread)
        .get()).data()!;
      firestore()
        .collection("threads")
        .doc(thread)
        .set({ name, updatedAt: Date.now() });
    },
    addContentToThread(
      { dispatch },
      {
        thread,
        contributor,
        content
      }: { thread: string; content: string; contributor: string }
    ) {
      firestore()
        .collection(thread)
        .add({ content, contributor, createdAt: Date.now() });
      dispatch("updateThread", thread);
    },
    setContents({ commit }, contents: ContentType[]) {
      commit("setCurrentContents", contents);
    }
  }
});
