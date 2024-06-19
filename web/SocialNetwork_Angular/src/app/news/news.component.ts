import { Component } from '@angular/core';
import { HttpService } from '../https.service';

@Component({
  selector: 'news-component',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})

export class NewsComponent {  
    news: any[] = [];

    constructor(private httpService: HttpService) { }


    ngOnInit() {
        this.Init();
    }

    Init(){
        this.httpService.get_data("friendsNews").subscribe((date: any) => {
            console.log(date);
            this.news = date;
          });
    }
}
