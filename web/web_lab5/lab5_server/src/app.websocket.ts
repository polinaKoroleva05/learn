import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server } from "socket.io"
import * as fs from "fs";
import * as path from 'path';
import { from, pipe, timer, interval } from "rxjs";
import { map } from "rxjs/operators";

let i = 0;
let stop: NodeJS.Timeout = null;

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:8080"],
        credentials: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept,Access-Control-Allow-Origin',
    },
    transport: ["websocket"]
})
export class AppWebSocket implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    clients=[];
    admins=[];

    handleConnection(client: any, ...args: any[]) {
        this.clients.push(client);
        console.log("new client", client.id, this.clients.length);
    }
    handleDisconnect(client: any) {
        const ind = this.clients.findIndex(cl => cl === client);
        this.clients.splice(ind, 1);
        console.log("delete client", client.id, this.clients.length);
    }

    @SubscribeMessage("info")
    startExchange(@MessageBody() data: any) {
        console.log("recieve websocket", data);
        const arrHistory = data.stocks.map(designation =>
            JSON.parse(fs.readFileSync(path.join(process.cwd(), `/src/dataBase/${designation}.json`), "utf8"))
        )
        const date = data.startDate.split(".");
        const maxDate = arrHistory[0].at(-1).Date.split(".");
        if (date[2] > maxDate[2] || (date[2] === maxDate[2] && date[1] > maxDate[1]) || (date[2] === maxDate[2] && date[1] === maxDate[1] && date[0] > maxDate[0]))
            return "дата больше возможной"

        i = arrHistory[0].findIndex(elem => {
            const elemPieces = elem.Date.split(".");
            return (date[2] < elemPieces[2] || (date[2] === elemPieces[2] && date[1] < elemPieces[1]) || (date[2] === elemPieces[2] && date[1] === elemPieces[1] && date[0] <= elemPieces[0]))
        })
        console.log("finded next date", arrHistory[0][i].Date, "for start", data.startDate);
        stop = setInterval(() => this.takeOneDay(arrHistory, data), data.speed);
    }

    takeOneDay(arrHistory, data) {
        if (i < arrHistory[0].length) {
            const newData = arrHistory.map((stock, index) => ({
                "designation": data.stocks[index],
                "Date": stock[i].Date,
                "Open": stock[i].Open
            }))
            i += 1;
            this.server.emit("update", newData);
            this.clients.forEach(client=>client.send("update", newData));
        }
        else{
            clearInterval(stop);
            console.log("stop intervals");
        }
    }

    @SubscribeMessage("disc")
    StopInterval() {
        clearInterval(stop);
        console.log("stop intervals");
    }

    @SubscribeMessage("updateBroker")
    UpdateBroker(@MessageBody() data: any) {
        console.log("brokers updated", data)
        const brokers = JSON.parse(fs.readFileSync(path.join(process.cwd(), `/src/dataBase/brokers.json`), "utf8"))
        const ind = brokers.findIndex(man => man.id === data.id);
        console.log("in update0", brokers[ind])
        brokers[ind].stocks = data.stocks;
        console.log("in update1", brokers[ind])
        brokers[ind].tmpMoney = data.money;
        console.log("in update2", brokers[ind])
        fs.writeFileSync(path.join(process.cwd(), "/src/dataBase/brokers.json"), JSON.stringify(brokers), 'utf8');
        this.server.emit("admin", brokers);
    }

    @SubscribeMessage("admin")
    pushAdmin(client: any){
        this.admins.push(client);
        console.log("new admin", client.id, this.admins.length);
    }
}

// interval(data.speed*1000).pipe(
//     map(item => {
//         this.takeOneDay()
//     })
// );

// {event: "info", "data": [{
//     "name": "aapl",
//     "designation": "a",
//     "Data": "20/20/2023",
//     "Open": 389
// },
// {
//     "name": "sums",
//     "designation": "s",
//     "Data": "20/20/2023",
//     "Open": 134
// }]}


// const base = JSON.parse(fs.readFileSync(path.join(process.cwd(), `/src/dataBase/${designation}.json`), "utf8"))
//             const reversed = base.reverse();
//             const normal = reversed.map(item => {
//                 const date = item.Date.split("/");
//                 const normalDate = `${date[1]}.${date[0]}.${date[2]}`
//                 return {...item, Date: normalDate}
//             })
//             fs.writeFileSync(path.join(process.cwd(), `/src/dataBase/${designation}.json`), JSON.stringify(normal), 'utf8');