<template>
  <div class="App">
    <header class="App-header">
      <div class="menu">
        <router-link to="/">Auth </router-link>
        <router-link to="/main">Main</router-link>
        <router-link to="/admin" v-if="isAdmin">AdminPage</router-link>
      </div>
      <router-view />
    </header>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import Auth from "./components/Auth.vue"
//import Main from "./components/Main.vue";

export default {
  name: "App",
  computed: {
    isAdmin() {
      return this.$store.state.user.isAdmin;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

a {
  color: #61dafb;
}

.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.menu {
  width: 95vw;
  position: absolute;
  top: 2vh;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

body{
    margin: 0;
}
</style>
