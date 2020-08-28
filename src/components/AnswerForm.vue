<template>
  <div class="answer-form">
    <h3>Write something</h3>
    <br />
    <span>Title:</span>
    <input type="text" v-model="title" />
    <span>Author:</span>
    <input type="text" v-model="author" />
    <span>Content:</span>
    <textarea v-model="msg"></textarea>
    <button @click="onSubmit">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Emit, Vue } from "vue-property-decorator";

@Component
export default class AnswerForm extends Vue {
  @Provide()
  title = "";
  @Provide()
  author = "";
  @Provide()
  msg = "";

  @Emit("submit")
  onSubmit() {
    return this.$data;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.answer-form {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 15px auto;
  width: 500px;
  text-align: left;
  overflow: hidden;
  background-color: white;
  input {
    width: 100%;
  }
  textarea {
    width: 100%;
  }
  button {
    float: right;
  }
}
h3 {
  margin: 0;
}
</style>
