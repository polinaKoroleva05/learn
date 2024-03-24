import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()

export class HttpService {
    id: number = 1; ///         АЙДИШНИК ПО УМОЛЧАНИЮ!!
    idChange: Subject<number> = new Subject<number>();

    constructor(private http: HttpClient) {
        console.log("server created");
        this.idChange.subscribe((value) => {
            console.log("change id in service");
            this.id = value;
        });

    }

    set_id(newid: number) {
        this.id = newid;
    }

    get_data(type: string) {
        return this.http.get(`https://localhost:1338/getData?type=${type}&id=${this.id}`);
    }

    set_data(type: string, body: any) {
        console.log(body);
        return this.http.post(`https://localhost:1338/?type=${type}&id=${this.id}`, body);
    }

    login(body: any) {
        console.log(body);
        return this.http.post(`https://localhost:1338/auth`, body);
    }
}
