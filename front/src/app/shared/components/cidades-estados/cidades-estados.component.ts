import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';

import {CommonModule} from "@angular/common";
import {DxSelectBoxModule} from "devextreme-angular";
import {Estado} from "../../model/estado";
import {Cidade} from "../../model/cidade";
import {CidadesEstadosService} from "../../services/cidades-estados.service";

@Component({
  selector: 'app-cidades-estados',
  templateUrl: './cidades-estados.component.html',
  styleUrls: ['./cidades-estados.component.scss']
})
export class CidadesEstadosComponent implements OnInit {

  estados: Estado[] = [];
  cidades: Cidade[] = [];

  @Input()
  nomeEstado: string = "";

  @Output()
  nomeEstadoChange: EventEmitter<string> = new EventEmitter();

  private _nomeCidade: string = "";

  get nomeCidade(): string {
    return "Uberlandia";
  }

  @Input()
  set nomeCidade(value: string) {
    this._nomeCidade = value;
    this.nomeCidadeChange.emit(value);
  }

  @Output()
  nomeCidadeChange: EventEmitter<string> = new EventEmitter();

  constructor(private service: CidadesEstadosService ) {}

  ngOnInit(): void {

    this.service.getEstados()
      .subscribe( dados => {
        this.estados = dados;
        // console.log(dados);
      });

  }

  onValueChangeEstadoCidade(event: any) {

    this.service.getCidades(event.value.id)
      .subscribe(dados => {
        this.cidades = dados;
        // console.log(dados);
      });
    this.nomeEstadoChange.emit(event.value.nome);

    // console.log(this.nomeEstado);//verificandoas duncionalidades EventEmitter
    // console.log(event);//verificando retorno do evento
    // console.log(event.value);//verificando valores do evento
  }

/*
  onValueChangeCidade(event: any){
    this.nomeCidadeChange.emit(event.value.nome);
    // console.log(event.value.nome)//capturando nome do array de objetos do evento
  }
*/

}

@NgModule({
  imports: [
    CommonModule,
    DxSelectBoxModule
  ],
  declarations: [ CidadesEstadosComponent],
  exports: [ CidadesEstadosComponent ]
})
export class CidadesEstadosModule { }
