import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DxDataGridModule, DxSelectBoxModule, DxSpeedDialActionModule} from "devextreme-angular";
import {ClienteService} from "../../../services/cliente.service";
import {Router} from "@angular/router";
import {Cliente} from "../../../model/cliente";

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = new Cliente();
  submitted = false;

  constructor( private _clienteService: ClienteService,
               private router: Router) { }

  ngOnInit(): void {
  }

  // novoCliente(): void{
  //   this.submitted = false;
  //   this.cliente = new Cliente();
  // }
  //
  // save() {
  //   this._clienteService.createCliente(this.cliente)
  //     .subscribe(data => console.log(data),
  //         error => console.log(error));
  //   this.cliente = new Cliente();
  //   this.gotoList();
  // }
  //
  // onSubmit() {
  //   this.submitted = true;
  //   this.save();
  // }
  //
  // gotoList() {
  //   this.router.navigate(['/clientes']);
  // }
}

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxSelectBoxModule
  ],
  declarations: [ ClienteCreateComponent],
  exports: [ ClienteCreateComponent ]
})
export class ClienteCreateModule { }
