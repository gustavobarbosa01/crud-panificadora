import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxSpeedDialActionModule
} from "devextreme-angular";
import {Produto} from "../../../model/produto";
import {Change, PedidoService, ProdutoService} from "../../../services";
import {HttpParams} from "@angular/common/http";
import {Pedido} from "../../../model/pedido";

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {


  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  pedidos: Pedido[] = [];
  changes: Change<Pedido>[] = [];
  editRowKey?: number = null;
  selectedRowIndex = -1;
  isLoading = false;
  // errorText: any;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {

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

  async reloadDados(){
    debugger
    this.isLoading = true;
    this.pedidos = this.pedidos = await this.pedidoService.getPedidoList().toPromise();
    this.isLoading = false;
  }

  async insertRow(e){
    // debugger
    const isCanceled = async () => {
      const dialogResult = await window.confirm("Deseja realemnte Criar um novo produto?");
      if (dialogResult) {
        let params = new HttpParams();
        for (let key in e.data) {
          params = params.set(key, e.data[key]);
        }
        const novoPedido = await this.pedidoService.insertPedido({ params: e.data }).toPromise();
        this.reloadDados();
        if (novoPedido) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    e.cancel = await isCanceled();
  }

  async updateRow(e) {
    // debugger
    const isCanceled = async () => {
      const dialogResult = await confirm("Deseja realemnte Alterar este Produto?");
      if (dialogResult) {
        let params = new HttpParams();
        for (let key in e.key) {
          params = params.set(key, e.key[key]);
        }
        const atualizarPedido = await this.pedidoService.updatePedido({ params: e.key }).toPromise();
        if (atualizarPedido) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    e.cancel = await isCanceled();
  }

  async validateRemove(e) {
    // debugger
    const isCanceled = async () => {
      const removido = await this.pedidoService.removePedido(e.key).toPromise();
      this.reloadDados();
      if (removido) {
        return true;
      } else {
        return false;
      }
    }
    e.cancel = await isCanceled();
  }
}

@NgModule({
  imports:[
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxSelectBoxModule,
    DxLoadPanelModule,
  ],
  declarations:[ PedidoListComponent ],
  exports:[ PedidoListComponent ]
})
export class PedidoListModule{}
