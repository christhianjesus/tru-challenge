<template>
  <div class="post">
    <div class="post-body">
      <h2>{{ title }}</h2>
      <p>{{ msg }}</p>
      <br />
      From: {{ author }}
    </div>
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
  name: "Post",
  components: {
    PostList,
    AnswerForm
  },
  methods: {
    listUpdate(path) {
      axios
        .get(url + "/messages/" + path)
        .then(response => {
          this.posts = response.data;
        })
        .catch(e => {
          console.error(e);
        });
    },
    postMessage(values) {
      const path = this.$route.params.pathMatch;
      axios
        .post(url + "/post" + path, values)
        .then(() => {
          this.listUpdate(path);
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  data() {
    return {
      title: "",
      msg: "",
      author: "",
      posts: []
    };
  },
  mounted() {
    const path = this.$route.params.pathMatch;
    axios
      .get(url + "/post/" + path)
      .then(response => {
        this.title = response.data.title;
        this.msg = response.data.msg;
        this.author = response.data.author;
      })
      .catch(e => {
        console.error(e);
      });
    this.listUpdate(path);
  }
};
</script>

<style scoped lang="scss">
.post-body {
  margin: 60px;
  padding: 0 30px 30px 30px;
  text-align: left;
  background-color: white;
  border: 1px solid #cdcdcd;
}
</style>
