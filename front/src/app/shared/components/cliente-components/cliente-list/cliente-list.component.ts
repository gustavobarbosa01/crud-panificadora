import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Change, ClienteService} from "../../../services/cliente.service";
import {Cliente} from "../../../model/cliente";
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxSpeedDialActionModule
} from "devextreme-angular";
import applyChanges from "devextreme/data/apply_changes";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  clientes: Cliente[] = [];
  changes: Change<Cliente>[] = [];
  editRowKey?: number = null;
  selectedRowIndex = -1;
  isLoading = false;

  // ordersSubscription: Subscription;
  // orders$: Observable<Cliente[]>;

  constructor(private _clienteService: ClienteService) {
    // this.orders$ = this._clienteService.getOrders();
  }

  ngOnInit(): void {
    // this.isLoading = true;
    /*this.ordersSubscription = this.orders$.subscribe(() => {
      this.isLoading = false;
    });*/
    this.reloadDados();

  }

  //Botões Layout
  addRow() {
    this.grid.instance.addRow();
    this.grid.instance.deselectAll();
  }

  editRow() {
    this.grid.instance.editRow(this.selectedRowIndex);
    this.grid.instance.deselectAll();
  }

  deleteRow() {
    this.grid.instance.deleteRow(this.selectedRowIndex);
    this.grid.instance.deselectAll();
  }

  selectedChanged(e) {
    this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
  }

  //metodos para listar, salvar, editar e exlcuir

  async reloadDados() {
    this.isLoading = true;
    this.clientes = this.clientes = await this._clienteService.getClientesList().toPromise();
    this.isLoading = false;
    //this._clienteService.getClientesList().subscribe(dados => {this.clientes = dados;this.isLoading = false;});
  }

  async onSaving(e: any) {
    // debugger
    this.isLoading = true;

    if (e  && e.changes.length > 0) {
      e.cancel = true;
      e.promises = this.processSaving(e);
      e.cancel = false;
    }
    this.isLoading = false;
    this.reloadDados();
    /*const change = e.changes[0];
    if (change) {
      e.cancel = false;
      e.promise = this.processSaving(change);
      this.isLoading = true;
    }
    this.isLoading = false
    this.reloadDados();*/
  }

  async processSaving(e: any) {

    for (let change of e.changes) {

      if (change.type == 'insert') {
        let novo = await this._clienteService.insertCliente(change.data).toPromise();
        this.clientes.push(novo);
        this.clientes = applyChanges(this.clientes, [novo], {keyExpr: 'id'});
        this.reloadDados();
      } else
        if (change.type == 'update') {
            change.data = Object.assign(change.key, change.data);
            // console.log(change.data);
            let alterado = await this._clienteService.updateCliente(change.data).toPromise();
            this.clientes.push(alterado);
            this.clientes = applyChanges(this.clientes, [alterado], {keyExpr: 'id'});
      }
      else
        if (change.type == 'remove') {
          await this._clienteService.removeCliente(change.key).toPromise();
          this.reloadDados();
      }

    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxSelectBoxModule,
    DxLoadPanelModule,
  ],
  declarations: [ ClienteListComponent ],
  exports: [ ClienteListComponent ]
})
export class ClienteListModule { }

//Retornar valor do change modificado em Json
// changesText(change: any) {
//   const changeNovo = JSON.stringify(this.changes.map((change) => ({
//     type: change.type,
//     key: change.type !== 'insert' ? change.key : undefined,
//     data: change.data,
//   })), null, ' ');
//   console.log(change)
//   return changeNovo ;
// }
