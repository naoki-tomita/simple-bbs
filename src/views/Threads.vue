<template lang="pug">
div
  div(v-for="thread in threads")
    router-link(v-bind:to="`/threads/${thread.id}`") {{ thread.name }}
  input(v-model="threadName")
  button(@click="onClickCreate") create thread
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import Thread from "./Thread.vue";
import { ThreadType } from "../store";
import { firestore } from "firebase";

@Component
export default class Threads extends Vue {
  @Getter("threads") threads!: ThreadType[];
  @Action("addThread") addThread!: (thread: string) => void;
  @Action("setFetchedThreads") setFetchedThreads!: (
    threads: ThreadType[]
  ) => void;

  threadName: string = "";
  unsubscriber?: () => void;

  mounted() {
    this.unsubscriber = firestore()
      .collection("threads")
      .orderBy("updatedAt", "desc")
      .onSnapshot(snapshot => {
        const threads: ThreadType[] = [];
        snapshot.forEach(thread => {
          threads.push({ id: thread.id, name: thread.data().name });
        });
        this.setFetchedThreads(threads);
      });
  }

  onClickCreate() {
    this.addThread(this.threadName);
    this.threadName = "";
  }

  destroyed() {
    this.unsubscriber && this.unsubscriber();
  }
}
</script>
