<template>
  <div>
    <h3>Выберите свое имя</h3>
    <div class="brokers">
      <button
        v-on:click="setUser(index)"
        v-bind:class="classNsame(man.name)"
        v-for="(man, index) in brokers"
        v-bind:key="index"
      >
        {{ man.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    // Параметры компонента
    return {
      brokers: [],
    };
  },
  methods: {
    // Методы компонента
    setUser(ind) {
      console.log("set name", ind);
      this.$store.commit("setUser", { user: this.brokers[ind] });
    },
    classNsame(name) {
      if (this.$store.state.user.name === name) return "chosenBroker";
      return "broker";
    },
  },
  mounted() {
    fetch("http://localhost:3001/brokers", { method: "GET" })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
          this.brokers = res;
        },
        (error) => {
          console.log("error in brokers fetch", error);
        }
      );
  },
};
</script>

<style>
#Auth {
  text-align: center;
  margin-top: 60px;
}
* {
  color: #ffffff;
  font-size: calc(10px + 2vmin);
}
.broker {
  border: 2px solid #61dafb;
  width: 70vw;
  margin-bottom: 2vh;
  padding: 3vh 0 3vh 0;
  border-radius: 20px;
  background-color: #ffffff00;
  cursor: pointer;
}

.chosenBroker {
  border: 2px solid #61dafb;
  width: 70vw;
  margin-bottom: 2vh;
  padding: 3vh 0 3vh 0;
  border-radius: 20px;
  background-color: #61dafb32;
  cursor: pointer;
}

.brokers {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10vh 0 6vh 0;
}
</style>
