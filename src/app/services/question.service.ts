import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { OpcoesRespostas } from '../models/opcoes-respostas.model';
import * as faker from 'faker';
import { Pergunta } from '../models/pergunta.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private perguntas: Pergunta[] = [];
    private opcoesRespostas: OpcoesRespostas[] = [];

    constructor() {
        this.setOpcoes();
        this.setQuestions();
    }

    getQuestions(): Observable<Pergunta[]> {
        return of(this.perguntas);
    }

    private setOpcoes(): void {
        let opcao = new OpcoesRespostas();
        opcao.opcaoid = 1;
        opcao.opcaotexto = '19';
        opcao.respondida = false;
        opcao.perguntaid = 1;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = 2;
        opcao.opcaotexto = '30';
        opcao.respondida = false;
        opcao.perguntaid = 1;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = 3;
        opcao.opcaotexto = '20';
        opcao.respondida = false;
        opcao.perguntaid = 1;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = 4;
        opcao.opcaotexto = '28';
        opcao.respondida = false;
        opcao.perguntaid = 1;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 2;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 2;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 2;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 3;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 3;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 3;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 3;
        this.opcoesRespostas.push(opcao);

        opcao = new OpcoesRespostas();
        opcao.opcaoid = faker.random.number(2);
        opcao.opcaotexto = faker.lorem.word();
        opcao.respondida = false;
        opcao.perguntaid = 2;
        this.opcoesRespostas.push(opcao);
    }

    private recuperarOpcoes(perguntaID: number): OpcoesRespostas[] {
        return this.opcoesRespostas.filter(r => r.perguntaid === perguntaID);
    }

    private setQuestions() {
        let questao = new Pergunta();

        questao.perguntaid = 1;
        questao.texto = 'Qual sua idade?';
        questao.opcoesresposta = this.recuperarOpcoes(questao.perguntaid);
        this.perguntas.push(questao);

        questao = new Pergunta();
        questao.perguntaid = 2;
        questao.texto = 'Qual seu nome?';
        questao.multiplaescolha = false;
        questao.opcoesresposta = this.recuperarOpcoes(questao.perguntaid);
        this.perguntas.push(questao);

        questao = new Pergunta();
        questao.perguntaid = 3;
        questao.texto = 'Qual seu sobrenome?';
        questao.opcoesresposta = this.recuperarOpcoes(questao.perguntaid);
        this.perguntas.push(questao);
    }
}
