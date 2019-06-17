import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerguntaComponent } from './pergunta/pergunta.component';

const routes: Routes = [{
  path: 'pergunta', component: PerguntaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
