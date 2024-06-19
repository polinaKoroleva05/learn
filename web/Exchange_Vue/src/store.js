/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
    state() {
        return { // Общий счетчик
            user: {
                id: 4,
                name: "Polina Koroleva",
                isAdmin: true,
                tmpMoney: 1800,
                money: 180000,
                stocks: []
            },
            stockModal: ""
        }
    },
    mutations: {
        setUser(state, payload) {
            // Изменение состояния
            state.user = payload.user;
            console.log("update in store", state.user)
        },
        inc(state, payload) {
            const i = state.user.stocks.findIndex(stock => stock.designation === payload.stockName);
            if (i !== -1) {
                state.user.stocks[i].count += 1;
                state.user.stocks[i].spend += payload.price;
                state.user.tmpMoney -= payload.price;
            } else {
                state.user.tmpMoney -= payload.price;
                state.user.stocks.push({ designation: payload.stockName, spend: payload.price, count: 1 })
            }
        },
        dec(state, payload) {
            const i = state.user.stocks.findIndex(stock => stock.designation === payload.stockName);
            if (i !== -1) { //если вообще нашлось
                if (state.user.stocks[i].count === 1) { //если хотим продать последнюю акцию, просто удалим ее
                    state.user.stocks.splice(i, 1);
                    state.user.tmpMoney += payload.price;
                    return;
                }
                state.user.stocks[i].count -= 1;
                state.user.stocks[i].spend -= payload.price;
                state.user.tmpMoney += payload.price;
            }
        },
        open(state, payload){
            state.stockModal = payload.stock;
        }
    }
})