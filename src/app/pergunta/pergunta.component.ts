import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Pergunta } from '../models/pergunta.model';
import { QuestionService } from '../services/question.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { OpcoesRespostas } from '../models/opcoes-respostas.model';

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

  constructor(private perguntaService: QuestionService, private builderForm: FormBuilder, private toastr: MessageService) {
    this.initForm();
  }

  get opcoesRespostas(): FormArray {
    return this.formBase.get('opcoesresposta') as FormArray;
  }

  carregarPergunta(perguntaId: number) {
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
      opcoesresposta: this.builderForm.array([])
    });
  }

  private addFormGroup(opcoes: OpcoesRespostas): FormGroup {
    let novaResposta: FormGroup;

    novaResposta = this.builderForm.group({
      opcaoid: this.builderForm.control(opcoes.opcaoid),
      opcaotexto: this.builderForm.control(opcoes.opcaotexto),
      respondida: this.builderForm.control(opcoes.respondida),
      perguntaid: this.builderForm.control(opcoes.perguntaid)
    });

    return novaResposta;
  }

  private cleanOpcoes() {
    this.formBase.get('novaResposta').reset();
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
