import React from 'react';
import { store } from '../store';
import { io } from "socket.io-client";


export default class Exchange extends React.Component {
    constructor(props) {
        console.log("constructed биржа");
        super(props);
        this.date = "11.11.2022";
        this.speed = 1;
        this.onChange = this.onChange.bind(this);
        this.start = this.start.bind(this);
        this.unsubscribe = store.subscribe(() => console.log(store.getState()));
        this.state = {
            stocksUpdate: []
        };
        // Отправка действий диспетчеру
    }

    onChange(e, isdate = false) {
        if (isdate) this.date = e.target.value;
        else this.speed = e.target.value;
        console.log(this.date, this.speed);
    }

    start(e) {
        //создается вебсокет, передается серверу данные о дате старта, скорости и акциях, участвующих
        //а сервер устанавливает таймсет и каждый раз бродкастит брокерам новые данные об акции
        e.preventDefault();
        if(!store.getState().stocksInExchange.length){
            console.log("Акции не выбраны");
            return
        }
        const dateArr = this.date.split(".")
        if(+dateArr[0] > 31 || +dateArr[1] > 12){
            console.log("Некорректная дата");
            return
        }
        this.socket = io("http://localhost:3001");
        this.socket.on("connect", () => {
            console.log("connect websoket");
        });
        this.socket.on("disconnect", () => {
            console.log("disconnect");
        })
        this.socket.on("update", (stocksUpdate) => { 
            console.log("recieve webupdate", stocksUpdate);
            this.setState({ stocksUpdate }) 
        });
        this.socket.emit("info", { "stocks": store.getState().stocksInExchange, "startDate": this.date, "speed": this.speed }, (data)=> console.log(data))
    }

    render() {
        console.log(store.getState());
        console.log(this.state.stocksUpdate);

        if (!this.state.stocksUpdate.length) {
            return (
                <>
                    <p>Дата начала торгов</p>
                    <form onSubmit={this.start}>
                        <input name="start" type="text" pattern='[0-9]{2}.[0-9]{2}.[0-9]{4}' placeholder="дд.мм.гггг" onChange={(e) => this.onChange(e, true)}></input>
                        <br></br>
                        <p>Скорость смены дат</p>
                        <input name="speed" type="number" placeholder="мили сек/день" onChange={this.onChange}></input>
                        <br></br>
                        <input type="submit" value="Начать торги"></input>
                    </form>
                </>
            );
        }
        const stocksUpdate = this.state.stocksUpdate.map((stock) =>
            <div className="stock" key={stock.designation}>
                <p> {stock.designation} </p>
                <p> {stock.Date} {stock.Open} </p>
            </div>)

        return (
            <div className="stocks">
                {stocksUpdate}
            </div>
        );
    }

    componentWillUnmount() {
        console.log("биржа отключается");
        this.unsubscribe();
        if(this.socket)
            this.socket.emit("disc");
    }
}
