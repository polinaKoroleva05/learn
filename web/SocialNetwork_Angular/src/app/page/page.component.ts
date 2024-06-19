import { Component } from '@angular/core';
import { HttpService } from '../https.service';

@Component({
    selector: 'page-component',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.less'],
})

export class PageComponent {
    name: string = "";
    birthday: string = "";
    email: string = "";
    role: string = "";
    isAdmin: boolean = false;
    status: string = "";
    note: string = "";
    news: string[] = [];
    constructor(private httpService: HttpService) {
        console.log("reinit");
        this.httpService.idChange.subscribe(() => {
            this.Init();
        })
    }

    ngOnInit() {
        this.Init();
    }

    private Init() {
        this.httpService.get_data("theUser").subscribe((data: any) => {
            console.log("in page", data);
            this.name = data.name ;
            this.birthday = data.birthday;
            this.email = data.email;
            this.role = data.role;
            this.isAdmin = (this.role === "admin");
            this.status = data.status;
            this.news = data.news;
        });
    }
    addNews() {
        this.news.push(this.note);
        this.httpService.set_data("theUserAddNews", { "note": this.note }).subscribe((data: any) => {
            console.log(data);
            this.note = "";
        });
    }
}
