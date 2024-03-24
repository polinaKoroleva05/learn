<template>
  <h3 v-if="!isStarted">Торги скоро начнутся</h3>
  <div v-else class="trans">
    <p>Здравствуйте, {{ this.$store.state.user.name }}!</p>
    <p>Ваш баланс без акций {{ Math.round(money * 100) / 100 }}</p>
    <p>Ваш баланс c учетом акций {{ moneyWithProfit() }}</p>
    <div class="stocks">
      <div class="stock" v-for="stock in update" v-bind:key="stock.designation">
        <button class="buy" v-on:click="buy(stock.designation, stock.Open)">
          +
        </button>
        <button class="sell" v-on:click="sell(stock.designation, stock.Open)">
          -
        </button>
        <p>{{ stock.designation }}</p>
        <p>{{ stock.Date }} {{ stock.Open }}</p>
        <p>you have {{ count(stock.designation) }} stocks</p>
        <p>profit: {{ profit(stock.Open, stock.designation) }}</p>
        <button @click="open(stock.designation)">График</button>
        <modal v-if="showModal">
          <transition name="modal">
            <div class="modalback">
              <div class="modal">
                <button class="close" v-on:click="showModal = false">X</button>
                <Chart/>
              </div>
            </div>
          </transition>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import { socket, state } from "../socket.js";
import Chart from "./Chart.vue";
export default {
  name: "Main",
  components: { Chart },
  data() {
    return {
      msg: "УРА ПОЛЯ",
      allProfit: 0,
      showModal: false,
    };
  },
  computed: {
    money() {
      return this.$store.state.user.tmpMoney;
    },
    stocks() {
      return this.$store.state.user.stocks;
    },
    id() {
      return this.$store.state.user.id;
    },
    connected() {
      return state.connected;
    },
    update() {
      return state.updateEvents.at(-1).at(-1);
    },
    isStarted() {
      return state.updateEvents.at(-1);
    },
  },
  methods: {
    profit(price, stockName) {
      const tmpStock = this.stocks.find(
        (stock) => stock.designation === stockName
      );
      console.log("profit", stockName, tmpStock);
      if (tmpStock && tmpStock.count) {
        let profit = +price.slice(1) * tmpStock.count - tmpStock.spend;
        profit = Math.round(profit * 100) / 100;
        return profit > 0 ? `$${profit}` : `-$${-profit}`;
      }
      return "$0";
    },
    count(stockName) {
      const tmpStock = this.stocks.find(
        (stock) => stock.designation === stockName
      );
      return tmpStock ? tmpStock.count : 0;
    },
    buy(stockName, price) {
      console.log(price, this.money);
      if (+price.slice(1) <= this.moneyWithProfit()) {
        this.$store.commit("inc", { stockName, price: +price.slice(1) });
        socket.emit("updateBroker", {
          id: this.id,
          money: this.money,
          stocks: this.stocks,
        });
      }
    },
    sell(stockName, price) {
      this.$store.commit("dec", { stockName, price: +price.slice(1) });
      socket.emit("updateBroker", {
        id: this.id,
        money: this.money,
        stocks: this.stocks,
      });
    },
    moneyWithProfit() {
      let allProfit = 0;
      this.stocks.forEach((stock) => {
        const price = this.update.find(
          (stockUpdate) => stockUpdate.designation === stock.designation
        ).Open;
        allProfit += +price.slice(1) * stock.count;
      });
      console.log("баланс с акциями", this.money, allProfit);
      return Math.round((this.money + allProfit) * 100) / 100;
    },
    open(stock){
        this.showModal = true;
        this.$store.commit("open", {stock});
    }
  },
  mounted() {
    // console.log("start connecting");
    // socket.connect();
    // if (this.$store.state.user.isAdmin) {
    //   socket.emit("admin");
    // }
  },
};
</script>

<style>
.trans {
  margin-top: 30px;
}
.modalback {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.221);
  display: table;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.modal {
  position: fixed;
  top: 20vh;
  left: 10vw;
  width: 80vw;
  height: 47vw;
  background: #2b2f38;
  box-shadow: 2px 2px 20px 1px black;
}

.stock {
  border: 2px solid #61dafb;
  width: 70vw;
  padding: 3vh 0 3vh 0;
  border-radius: 20px;
  position: relative;
  margin: 0 auto 2vh auto;
}

.stocks {
  margin-top: 6vh;
}
p {
  color: #ffffff;
}

.close{
    background-color: #2b2f3800;
    border: none;
    position: relative;
    right: -38vw;
}
</style>
