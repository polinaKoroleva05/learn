import React from 'react';
import { store, add, del } from '../store';
import "./stocks.css";
import HistoryStocks from './historyStock';

export default class Stocks extends React.Component {
    constructor(props) {
        console.log("constructed акции");
        super(props);
        // Можно подписаться
        this.unsubscribe = store.subscribe(() => console.log(store.getState()))
        this.state = {
            stocks: [],
            disabled: [],
            stockHistory: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/stocks", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                this.setState({ stocks: [...res], disabled: res.map(stock => "none"), stockHistory: res.map(stock => []) });

            },
                error => {
                    console.log("error in stocks fetch", error)
                }
            )
    }

    addToExchange(design) {
        store.dispatch(add(design));
        this.forceUpdate();
    }

    deleteFromExchange(id) {
        store.dispatch(del(id));
        this.forceUpdate();
    }

    seeHistory(index, designation) {
        if (this.state.disabled[index] === "block") {
            this.setState({ disabled: this.state.disabled.map((item, idx) => idx === index ? "none" : item) });
        }
        else {
            this.setState({ disabled: this.state.disabled.map((item, idx) => idx === index ? "block" : item) });
            fetch(`http://localhost:3001/stock?designation=${designation}`, { method: "GET" })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        disabled: this.state.disabled.map((item, idx) => idx === index ? "block" : item),
                        stockHistory: this.state.stockHistory.map((item, idx) => idx === index ? res : item)
                    });
                    console.log(res);

                },
                    error => {
                        console.log("error in stocks fetch", error)
                    }
                )
        }
    }

    render() {
        const listStocks = this.state.stocks.map((stock, index) => {
            console.log(store.getState().stocksInExchange.includes(stock.designation));
            return <div className={store.getState().stocksInExchange.includes(stock.designation) ? "stockIN" : "stock"} key={stock.designation}>
                <button className="addToExchange" onClick={() => this.addToExchange(stock.designation)}>д</button>
                <button className="deleteFromExchange" onClick={() => this.deleteFromExchange(stock.designation)}>у</button>
                {stock.name}
                <br></br>
                {stock.designation}
                <br></br>
                <button className="seeHistory" onClick={() => this.seeHistory(index, stock.designation)}> Посмотреть историю</button>
                <div className="graphic" style={{ display: this.state.disabled[index] }}>
                    <HistoryStocks stockHistory={this.state.stockHistory[index]}></HistoryStocks>
                </div>
            </div>
        }
        )
        return (
            <>
                <div className="stocks">
                    {listStocks}
                </div>
            </>
        );
    }

    componentWillUnmount() {
        console.log("акции отключаются");
        this.unsubscribe();
    }
}
