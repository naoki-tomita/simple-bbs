import Vue from "vue";
import Router from "vue-router";
import Threads from "./views/Threads.vue";
import Thread from "./views/Thread.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/threads"
    },
    {
      path: "/threads",
      name: "threads",
      component: Threads
    },
    {
      path: "/threads/:id",
      name: "threads.item",
      component: Thread
    }
  ]
});
