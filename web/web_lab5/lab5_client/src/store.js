import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'stocksInExchange',
    initialState: { stocksInExchange: [] },
    reducers: {
        add: (state, stock) => { // Используется Immutable.JS
            if(!state.stocksInExchange.includes(stock.payload))
                state.stocksInExchange.push(stock.payload)
        },
        del: (state, stock) => {
            state.stocksInExchange = state.stocksInExchange.filter(item => item !== stock.payload)
        }
    }
})
const { add, del } = counterSlice.actions
const store = configureStore({
    reducer: counterSlice.reducer
})

export {add, del, store};