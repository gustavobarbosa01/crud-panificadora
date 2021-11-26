import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ClienteService} from "../../../services/cliente.service";
import {Observable} from "rxjs";
import {Cliente} from "../../../model/cliente";
import {DxDataGridModule} from "devextreme-angular";
import {DxButtonModule} from "devextreme-angular/ui/button";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  clientes$: Observable<Cliente[]>;

  constructor( private _clienteService: ClienteService ) {  }

  ngOnInit(): void {

    this.reloadDados();

  }

  reloadDados(){
    this._clienteService.getClientesList()
      .subscribe( dados => {
        this.clientes$ = dados;
        console.log(dados);
      });
  }

}

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule
  ],
  declarations: [ ClienteListComponent],
  exports: [ ClienteListComponent ]
})
export class ClienteListModule { }
