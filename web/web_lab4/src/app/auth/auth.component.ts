import { Component } from '@angular/core';
import { HttpService } from '../https.service';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less']
})

export class AuthComponent {
    name: string = "";
    password: string = "";
    comment: string = "";
    birthday: string = "";
    email: string = "";


    constructor(public httpService: HttpService) { }

    login() {
        this.httpService.login({ "name": this.name, "password": this.password }).subscribe((data: any) => {
            console.log(data);
            if (data.res) {
                this.comment = "";
                this.httpService.set_id(+data.res);
                this.httpService.get_data("theUser").subscribe((data: any) => {
                    console.log(data);
                });
                this.comment = "Авторизация успешна";
            }
            else {
                this.comment = "Неверный логин или пароль";
            }
        });
        // console.log(this.name, this.password);
    }

    add_user() {
        this.httpService.set_data("addUser", {
            "name": this.name,
            "password": this.password,
            "birthday": this.birthday,
            "email": this.email,
            "role": "user",
            "status": "active"
        }).subscribe((data: any) => {
            console.log("ответ после добавления", data);
        });
    }

    open_form(){
        let form = document.getElementById('formNewUser');
        if(form) form.style.display = "block";
    }
}
