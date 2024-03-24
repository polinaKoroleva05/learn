import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { HttpService } from './https.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MessagesComponent } from './messages/messages.component';
import { NewsComponent } from './news/news.component';
import { PageComponent } from './page/page.component';
import { NotFoundComponent } from './notFound/notFound.component';

const appRoutes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'myPage', component: PageComponent},
    {path: 'news', component: NewsComponent},
    {path: '**', component: NotFoundComponent}

  ];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MessagesComponent,
    PageComponent,
    NewsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
