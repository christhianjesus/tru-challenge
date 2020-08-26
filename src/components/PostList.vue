<template>
  <div class="post-list">
    <PostLink v-for="(post, key) in posts" v-bind="post" :key="key" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PostLink from "./PostLink.vue";

@Component({
  components: { PostLink }
})
export default class PostList extends Vue {
  @Prop() private posts!: {
    title: string;
    msg: string;
    author: string;
    answers: number;
  }[];
}
</script>

<style scoped lang="scss">
.post-list {
  margin: 5vh 5vw;
}
</style>
