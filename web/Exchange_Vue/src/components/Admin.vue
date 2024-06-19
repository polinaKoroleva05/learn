<template>
  <div>
    <div class="brokers">
      <p class="tmp">{{ this.updateBrokers }}</p>
      <div
        class="broker"
        v-for="(man, index) in updateBrokers"
        v-bind:key="man.id"
      >
        <p>{{ man.name }} {{ balance(index) }}</p>
        <div v-for="stock in man.stocks" v-bind:key="stock.designation">
          <p>
            {{ stock.designation }} {{ stock.count }}
            {{ profit(stock.designation, index) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { socket, state } from "../socket.js";
export default {
  name: "Main",
  data() {
    return {
      msg: "УРА ПОЛЯ",
      brokers: [],
    };
  },
  computed: {
    isStarted() { //начало торгов
      return state.updateEvents.length;
    },
    isChanged(){ //если поменяли брокеров
        return state.adminEvents.length;
    },
    updateBrokers() {
      return this.isChanged ? state.adminEvents.at(-1).at(-1) : this.brokers;
    },
    updateStocks() {
      return this.isStarted ? state.updateEvents.at(-1).at(-1) : [];
    },
  },
  methods: {
    profit(stockName, index) {
      if (!this.isStarted) return "";
      const price = this.updateStocks.find(
        (stock) => stock.designation === stockName
      ).Open;
      const tmpStock = this.updateBrokers[index].stocks.find(
        (stock) => stock.designation === stockName
      );
      console.log("admin", typeof price, price);
      console.log("admin", typeof tmpStock, tmpStock);
      let profit = +price.slice(1) * tmpStock.count - tmpStock.spend;
      profit = Math.round(profit * 100) / 100;
      return profit > 0 ? `$${profit}` : `-$${-profit}`;
    },
    balance(index) {
      if (!this.isStarted) return this.updateBrokers[index].tmpMoney;
      let res = this.updateBrokers[index].tmpMoney;
      this.updateBrokers[index].stocks.forEach((stockOfBroker) => {
        const price = this.updateStocks.find(
          (stock) => stock.designation === stockOfBroker.designation
        ).Open;
        res += stockOfBroker.count * +price.slice(1);
      });
      return Math.round(res * 100) / 100;
    },
  },

  mounted() {
    if (this.$store.state.user.isAdmin) {
      socket.emit("admin");
    }
    fetch("http://localhost:3001/brokers", { method: "GET" })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log("in admin fetch", res);
          this.brokers = res;
        },
        (error) => {
          console.log("error in brokers fetch admin", error);
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
    margin: 0 auto 2vh auto;
  padding: 3vh 0 3vh 0;
  border-radius: 20px;
  background-color: #ffffff00;
  cursor: pointer;
}

.brokers {
  margin-top: 6vh;
}

p.tmp {
  color: #4f86ae;
}
</style>