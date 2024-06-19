import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Brokers from './components/brokers';
import Stocks from './components/stocks';
import Exchange from './components/exchange';

export default class App extends Component {
    constructor(props) {
        super(props); // Настройка свойств в конструкторе
        // Состояние
        // Привязка контекста функции
    }

    render() {
        return (<div className="App">
            <header className="App-header">
            <BrowserRouter>
                <div>
                    <div className="menu">
                        <Link to="/" className="App-link" >Биржа</Link>
                        <Link to="/brokers" className="App-link">Брокеры</Link>
                        <Link to="/stocks" className="App-link">Акции</Link>
                    </div>
                    <Routes>
                        <Route exact path="/" element={<Exchange />}></Route>
                        <Route path="/brokers" element={<Brokers />}></Route>
                        <Route path="/stocks" element={<Stocks />}></Route>
                        <Route path="*" element={<Exchange />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
            </header>
        </div>)
    }

}


{/* <form onSubmit={this.onSubmit}>
<input type="text" value={this.state.text} placeholder="Текст" onChange={this.onChange} />
<input type="submit" value="Отправить" /><br />
<p>Отправлено: "<span>{this.state.outtext}</span>"</p>
<p>текст: "<span>{this.state.text}</span>"</p>
</form> */}