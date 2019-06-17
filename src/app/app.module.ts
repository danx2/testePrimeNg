import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PerguntaModule } from './pergunta/pergunta.module';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      PerguntaModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
