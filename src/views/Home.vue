<template>
  <div id="home">
    <h2>Welcome, this is a test.</h2>
    <post-list :posts="posts" />
    <answer-form class="center" @submit="postMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import AnswerForm from "@/components/AnswerForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

const url = process.env.VUE_APP_API_URL;

export default {
  name: "Home",
  components: {
    PostList,
    AnswerForm
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    listUpdate() {
      axios
        .get(url + "/messages")
        .then(response => {
          this.posts = response.data;
        })
        .catch(e => {
          console.error(e);
        });
    },
    postMessage(values) {
      axios
        .post(url + "/post", values)
        .then(() => {
          this.listUpdate();
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  mounted() {
    this.listUpdate();
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
