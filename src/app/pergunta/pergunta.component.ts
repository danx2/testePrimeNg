import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Pergunta } from '../models/pergunta.model';
import { QuestionService } from '../services/question.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { OpcoesRespostas } from '../models/opcoes-respostas.model';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css'],
  providers: [MessageService]
})
export class PerguntaComponent implements OnInit {
  formBase: FormGroup;
  items: MenuItem[];
  activeIndex = 0;
  perguntas: Pergunta[];
  terminouQuestionario = false;

  constructor(
    private perguntaService: QuestionService,
    private builderForm: FormBuilder,
    private toastr: MessageService,
    private rota: Router) {
    this.initForm();
  }

  onSubmit() {
    const model = this.formBase.getRawValue();
    this.toastr.add({ severity: 'success', summary: '', detail: 'Salvo com sucesso!' });
    console.log(model);
  }

  onCheckResposta(value: boolean, id: number) {
    this.opcoesRespostas.controls[id].patchValue({ respondida: value });
  }

  get opcoesRespostas(): FormArray {
    return this.formBase.get('opcoesresposta') as FormArray;
  }

  private carregarPergunta(perguntaId: number) {
    const pergunta = this.perguntas.find(p => p.perguntaid === perguntaId);

    if (!pergunta) {
      this.terminouQuestionario = true;

      return;
    }

    this.opcoesRespostas.clear();

    this.formBase.patchValue(pergunta);

    pergunta.opcoesresposta.forEach(opt => {
      this.opcoesRespostas.push(this.addFormGroup(opt));
    });
  }

  private initForm() {
    this.formBase = new FormGroup({
      perguntaid: this.builderForm.control(''),
      opcoesresposta: this.builderForm.array([]),
      observacaoresposta: this.builderForm.control(''),
      multiplaescolha: this.builderForm.control('')
    });
  }

  private addFormGroup(opcoes: OpcoesRespostas): FormGroup {
    let novaResposta: FormGroup;

    novaResposta = this.builderForm.group({
      opcaoid: this.builderForm.control(opcoes.opcaoid),
      opcaotexto: this.builderForm.control(opcoes.opcaotexto),
      respondida: this.builderForm.control(opcoes.respondida, Validators.requiredTrue),
      perguntaid: this.builderForm.control(opcoes.perguntaid)
    });

    return novaResposta;
  }

  private loadQuestion() {
    this.perguntaService.getQuestions()
      .subscribe((r: Pergunta[]) => {
        this.perguntas = r;
        this.items = [];

        this.perguntas.forEach((pergunta, i) => {
          this.items.push({
            label: pergunta.texto,
            command: () => {
              this.activeIndex = i;
              this.carregarPergunta(pergunta.perguntaid);
            }
          });
        });
      }, () => {
        this.toastr.add({ severity: 'error', summary: 'Ops!', detail: 'Erro ao carregar perguntas' });
      }, () => {
        const primeiraPergunta = [...this.perguntas];
        this.carregarPergunta(primeiraPergunta.shift().perguntaid);
      });
  }

  ngOnInit() {
    this.loadQuestion();
  }
}
