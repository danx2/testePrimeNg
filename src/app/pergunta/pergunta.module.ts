import { NgModule } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PerguntaComponent } from './pergunta.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [
        PerguntaComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        StepsModule,
        InputMaskModule,
        CardModule,
        ToastModule,
        CheckboxModule
    ]
})

export class PerguntaModule { }
