<template>
  <div id="home">
    <h2>Welcome, this is a test.</h2>
    <post-list :posts="posts" />
    <answer-form class="center" v-if="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import AnswerForm from "@/components/AnswerForm.vue";
import PostList from "@/components/PostList.vue";

export default {
  name: "Home",
  components: {
    PostList,
    AnswerForm
  },
  data() {
    return {
      posts: [
        {
          title: "Welcome",
          msg: "All right.",
          author: "Arthur",
          answers: 5
        },
        {
          title: "Welcome",
          msg: "All right.",
          author: "Arthur",
          answers: 5
        },
        {
          title: "Welcome",
          msg: "All right.",
          author: "Arthur",
          answers: 5
        },
        {
          title: "Welcome",
          msg: "All right.",
          author: "Arthur",
          answers: 5
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
#home {
  margin: 2vh 5vw;
}
h2 {
  text-align: left;
}
</style>
