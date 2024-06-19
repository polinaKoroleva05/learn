import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path';

@Injectable()
export class AppService {
    getBrokers(): string {
        const brokers = fs.readFileSync(path.join(process.cwd(), "/src/dataBase/brokers.json"), "utf8");
        console.log("brokers in get-request", brokers);
        return brokers;
    }

    deleteBroker(id: number){
        const brokers = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/src/dataBase/brokers.json"), "utf8"));
        let indx = brokers.findIndex(broker => broker.id === id);
        brokers.splice(indx, 1);
        this.save(brokers);
        return JSON.stringify(brokers);
    }

    createBroker(newData) {
        const brokers = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/src/dataBase/brokers.json"), "utf8"));
        let number = 0;
        for (let man of brokers) {
            if (number <= +man.id) {
                number = +man.id + 1;
            }
        }
        brokers.push({
            "id": number,
            "name": newData.name,
            "money": +newData.money,

        });
        this.save(brokers);
        return JSON.stringify(brokers);
    }

    changeMoney(id: number, money: number){
        const brokers = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/src/dataBase/brokers.json"), "utf8"));
        brokers.forEach(man => {
            if (man.id === id) man.money = money;
        });
        this.save(brokers);
        return JSON.stringify(brokers);
    }

    getStocks(){
        const stocks = fs.readFileSync(path.join(process.cwd(), "/src/dataBase/stocks.json"), "utf8");
        console.log(stocks);
        return stocks;
    }

    getStock(designation){
        const stockHistory = fs.readFileSync(path.join(process.cwd(), `/src/dataBase/${designation}.json`), "utf8");
        console.log(stockHistory);
        return stockHistory;
    }

    save(base) {
        fs.writeFileSync(path.join(process.cwd(), "/src/dataBase/brokers.json"), JSON.stringify(base), 'utf8');
    }
}
