import { OpcoesRespostas } from './opcoes-respostas.model';

export class Pergunta {
    perguntaid: number;
    texto: string;
    opcoesresposta: OpcoesRespostas[];
    observacaoresposta: string;
    multiplaescolha: boolean;
}
