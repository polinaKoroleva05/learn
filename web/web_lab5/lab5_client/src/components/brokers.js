import React from 'react';
import "./brokers.css"

export default class Brokers extends React.Component {
    constructor(props) {
        console.log("constructed брокеры");
        super(props);
        this.name = "";
        this.money = 0;
        this.state = {
            brokers: [],
            disabled: []
        };
        // Можно подписаться
        this.deleteBroker = this.deleteBroker.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeMoney = this.changeMoney.bind(this);

    }

    componentDidMount() {
        fetch("http://localhost:3001/brokers", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ brokers: [...res], disabled: res.map(broker => true) });

            },
                error => {
                    console.log("error in brokers fetch", error)
                }
            )
    }

    deleteBroker(id) {
        let res = window.confirm("вы уверены?")
        if(!res) return
        fetch(`http://localhost:3001/brokers?id=${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ brokers: [...res], disabled: res.map(broker => true) });

            },
                error => {
                    console.log("error in brokers fetch", error)
                }
            )
    }


    onChange(e, isname = false) {
        if (isname) this.name = e.target.value
        else this.money = e.target.value;
    }

    changeMoney(e, id) {
        e.preventDefault();
        //this.setState({ disabled: this.state.disabled.map(broker => true) });
        fetch(`http://localhost:3001/brokers?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ money: this.money }) //простро отправим на сервер новую сумму, а здесь ничего менять не нужно
        })
            .then(res => res.json())
            .then(res => {
                console.log("in change money", res);
                this.setState({ brokers: [...res], disabled: res.map(broker => true) });

            },
                error => {
                    console.log("error in brokers fetch", error)
                }
            )
    }

    addBroker(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/newbroker`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ money: this.money, name: this.name })
        })

            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ brokers: [...res], disabled: res.map(broker => true) });

            },
                error => {
                    console.log("error in brokers fetch", error)
                }
            )
    }

    render() {
        console.log(this.state);
        console.log("render брокеров");
        const listBrokers = this.state.brokers.map((man, index) =>
            <div className="broker" key={man.id}>
                <button className="delete" onClick={() => this.deleteBroker(man.id)}>d</button>
                {man.name}
                <br></br>
                <form onSubmit={(e) => this.changeMoney(e, man.id)}>
                    <input className="money" name="money" type="number" placeholder={man.money} onChange={this.onChange} disabled={this.state.disabled[index]}></input>
                    <input className="save" type="submit" value="готово" disabled={this.state.disabled[index]}></input>
                </form>
                <button className="change" onClick={() => this.setState({ disabled: this.state.disabled.map((item, idx) => idx === index ? false : true) })}>c</button>
            </div>
        )
        return (
            <>
                <div className='brokers'>
                    {listBrokers}
                </div>
                <p> Добавить брокера: </p>
                <form onSubmit={(e) => this.addBroker(e)}>
                    <input name="name" type="text" placeholder="Имя" onChange={(e) => this.onChange(e, true)}></input>
                    <br></br>
                    <input name="money" type="number" placeholder="Капитал" onChange={this.onChange}></input>
                    <br></br>
                    <input type="submit" value="добавить"></input>
                </form>
            </>
        );
    }
}
