<template lang="pug">
div
  ul
    li.contents(v-for="(content, index) in contents")
      .head
        .index {{ index + 1 }}
        .name {{ content.contributor }}
      .content {{ content.content }}
  div
    input(v-model="name", placeholder="name")
  div
    textarea(v-model="content")
  div
    button(@click="onClickSend") send
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { firestore } from "firebase";
import { ContentType } from "../store";
import { Action, Getter } from "vuex-class";

@Component
export default class Thread extends Vue {
  @Action("addContentToThread") addContentToThread!: (_: {
    thread: string;
    content: string;
    contributor: string;
  }) => void;
  @Action("setContents") setContents!: (contents: ContentType[]) => void;
  @Getter("contents") contents!: ContentType[];

  name: string = "";
  content: string = "";
  unsubscriber?: () => void;

  mounted() {
    this.unsubscriber = firestore()
      .collection(this.$route.params.id)
      .orderBy("createdAt", "asc")
      .onSnapshot(snapshot => {
        const contents: ContentType[] = [];
        snapshot.forEach(content => {
          contents.push({ id: content.id, ...content.data() } as any);
        });
        this.setContents(contents);
      });
  }

  onClickSend() {
    this.addContentToThread({
      thread: this.$route.params.id,
      contributor: this.name,
      content: this.content
    });
    this.name = "";
    this.content = "";
  }

  destroyed() {
    this.setContents([]);
    this.unsubscriber && this.unsubscriber();
  }
}
</script>
<style lang="scss" scoped>
ul {
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.head {
  display: flex;

  .index {
    &::after {
      content: ":";
    }
  }
  .name {
    padding-left: 12px;
  }
}
</style>
