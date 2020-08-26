<template>
  <div class="post">
    <div class="post-body">
      <h2>{{ title }}</h2>
      <p>{{ msg }}</p>
      <br />
      {{ author }}
    </div>
    <post-list :posts="posts" />
    <answer-form class="center" v-if="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import AnswerForm from "@/components/AnswerForm.vue";
import PostList from "@/components/PostList.vue";

export default {
  name: "Post",
  components: {
    PostList,
    AnswerForm
  },
  data() {
    return {
      title: "Some title",
      msg: "Some message",
      author: "Arthur"
    };
  }
};
</script>

<style scoped lang="scss">
.post-body {
  margin: 60px;
  padding: 30px;
  text-align: left;
  background-color: white;
  border: 1px solid #cdcdcd;
}
</style>
