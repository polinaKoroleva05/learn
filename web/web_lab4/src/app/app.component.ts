import { Component } from '@angular/core';
import { HttpService } from './https.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'lab4';
  constructor(private router: Router){}
}
