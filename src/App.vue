<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view :key="$route.path" />
    <div id="footer">
      <span>Copyright &copy; Christhian Guevara</span>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f8ff;
}
#nav {
  padding: 30px;
  text-align: left;
  background-color: #f5f5f5;
  border: 1px solid #cdcdcd;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#footer {
  color: white;
  background-color: #2c3e50;
}
button {
  height: 30px;
  font-weight: bold;
  color: #2c3e50;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #42b983;
}
</style>
