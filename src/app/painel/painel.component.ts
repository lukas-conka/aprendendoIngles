import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Array<Frase> = FRASES;
  public instrucao = 'Traduza a frase:';
  public resposta = '';

  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;

  public tentativas = 3;
  
  @Output() public encerrarJogo = new EventEmitter();

  constructor() {
    this.atualizaRodada();
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('componente painel foi destruido')
  }

  public atualizaResposta(resposta: Event): void {
   this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {

      // trocar pergunta da rodada
      this.rodada++;

      // Progresso
      this.progresso = this.progresso + (100 / this.frases.length);

      if (this.rodada === this.frases.length) {
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaRodada();

    } else {
      // diminuir a variavel tentativas
      this.tentativas--;

      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota');
      }
    }

  }

  public atualizaRodada(): void {

    // Define a frase da rodada com base em alguma logica
    this.rodadaFrase = this.frases[this.rodada];
    // Limpar a resposta
    this.resposta = '';

  }

}
