<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <contact-form @submit="postMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import ContactForm from "@/components/ContactForm.vue";
import axios from "axios";

const url = process.env.VUE_APP_API_URL;

export default {
  name: "Contact",
  components: {
    ContactForm
  },
  methods: {
    postMessage(values) {
      axios.post(url + "/contact", values).catch(e => {
        console.error(e);
      });
    }
  }
};
</script>
