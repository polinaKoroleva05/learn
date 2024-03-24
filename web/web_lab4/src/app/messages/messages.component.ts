import { Component } from '@angular/core';
import { HttpService } from '../https.service';
import { io } from "socket.io-client";

@Component({
    selector: 'messages-component',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.less']
})

export class MessagesComponent {

    constructor(private httpService: HttpService) { }

    login() {
        this.httpService.get_data("theUser").subscribe((date: any) => {
            console.log(date);
        });
    }

    name: string = "";
    msg: string = "";
    socket: any;
    messages: any[] = [];
    chats: any[] = [];
    roomNum: number = -1;

    ngOnInit() {
        this.Init();
    }

    Init() {
        this.httpService.get_data("chats").subscribe((date: any) => {
            console.log(date);
            this.chats = date.chats;
            this.name = date.user;
        });
        this.socket = io("https://localhost:1338");
        this.socket.on("connect", () => {
            console.log("connect", this.name);
        });
        this.socket.on("disconnect", () => {
            console.log("disconnect", this.name);
        })
        this.socket.on("msg", (msg: any) => { this.addUL(msg) });
    }

    openChat(roomNum: number) {
        if(this.roomNum !== -1){
            this.socket.emit("leave", {"name": this.name, "num": this.roomNum});
            console.log(this.roomNum, "leaved");
        }
        console.log(roomNum);
        this.roomNum = roomNum;
        this.httpService.get_data(`messages&num=${roomNum}`).subscribe((date: any) => {
            console.log(date);
            this.messages = date;
        });
        this.socket.emit("join", {"name": this.name, "num": this.roomNum})
    }

    // chat() {
    //     this.socket = io("https://localhost:1338");
    //     this.socket.on("connect", () => {
    //         this.socket.emit("conn", { "name": this.name })
    //     });
    //     this.socket.on("msg", (msg: any) => { this.addUL(msg.message) });
    //     //document.getElementById("send").disabled = false;
    //     //document.getElementById("login").disabled = true;
    // }

    addUL(msg: string) {
        this.messages.push(msg);
    }

    send() {
        if(this.socket){
            if(this.msg){
                this.socket.emit("msg", { "name": this.name, "value": this.msg });
                this.msg = "";
            }
        }
    }
}
