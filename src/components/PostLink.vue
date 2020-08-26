<template>
  <div class="post-link">
    <h2>{{ title }}</h2>
    <p>
      {{ msg }}
    </p>
    <div class="footer">
      <span>Comments: {{ answers }}</span>
      <span>Author: {{ author }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PostLink extends Vue {
  @Prop() private title!: string;
  @Prop() private msg!: string;
  @Prop() private author!: string;
  @Prop() private answers!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post-link {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  text-align: left;
  background-color: white;

  .footer span {
    font-size: 12px;

    &:last-child {
      float: right;
    }
  }
}
h2 {
  margin: 0;
}
</style>
