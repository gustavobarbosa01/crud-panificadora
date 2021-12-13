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
import {Change, ClienteService, PedidoService, ProdutoService} from "../../../services";
import {HttpParams} from "@angular/common/http";
import {Pedido} from "../../../model/pedido";
import {Cliente} from "../../../model/cliente";
import {ItemPedido} from "../../../model/item-pedido";
import DataSource from "devextreme/data/data_source";
import applyChanges from "devextreme/data/apply_changes";
import {FirstKeysToConsolePipeModule} from "../../../core/first-keys-to-console.pipe";

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {


  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  pedidos: Pedido[] = [];
  cliente: Cliente[] = [];
  produto: Produto[] = [];
  itens: ItemPedido[] = [];
  selectedRowIndex = -1;
  isLoading = false;

  constructor(private _pedidoService: PedidoService,
              private _clienteService: ClienteService,
              private _produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.getClientesCell();
    this.getProdutosCell();
    this.reloadDados();
  }

  async reloadDados(){
    // debugger
    this.isLoading = true;
    this.pedidos = await this._pedidoService.getPedidoList().toPromise();
    this.isLoading = false;
  }

  async getClientesCell(){
    this.cliente = await this._clienteService.getClientesList().toPromise();
  }

  async getProdutosCell(){
    this.produto = await this._produtoService.getProdutoList().toPromise();
  }

  nomeCliente(cliente: Cliente){
    if(cliente)
      return cliente.codigo + " - " + cliente.nome;
    else
      return cliente;
  }

  nomeProduto(produto: Produto){
    if(produto)
      return produto.id + " - " + produto.descricao;
    else
      return produto;
  }

  clienteAddValueChange(e: any, data:any) {
    // debugger
    data.setValue(this.cliente.find(x=>x.id==e));
  }

  produtoAddValueChange(e: any, data: any) {
    // debugger
    data.setValue(this.produto.find(x=>x.id==e));
  }

  onSavingItemPedido(e: any, data:any){
    // debugger
    for (let change of e.changes) {
      if (change.type == 'insert') {
        change.data.valorTotal = change.data.quantidade * change.data.produto.precoUnitario;
      } else if (change.type == 'update') {
        change.data = Object.assign(change.key, change.data);
        change.data.valorTotal = change.data.quantidade * change.key.produto.precoUnitario;
        data.value = applyChanges(data.value, [change.data], {keyExpr: 'id'});
      }
    }
    data.setValue(data.value)
  }

  onInitNewRowItemPedido(event: any){
    if(!event.data.itens){
      event.data.itens = new Array<ItemPedido>();
    }
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

  async insertRow(e: any){
    // debugger
    const isCanceled = async () => {
      let params = new HttpParams();
      for (let key in e.data) {
        params = params.set(key, e.data[key]);
      }
      const novoPedido = await this._pedidoService.insertPedido({ params: e.data }).toPromise();
      this.reloadDados();
      if (novoPedido) {
        return true;
      } else {
        return false;
      }
    }
    e.cancel = await isCanceled();
  }

  async updateRow(e) {
    // debugger
    const isCanceled = async () => {
      let params = new HttpParams();
      for (let key in e.key) {
        params = params.set(key, e.key[key]);
      }
      const atualizarPedido = await this._pedidoService.updatePedido({ params: e.key }).toPromise();
      if (atualizarPedido) {
        return true;
      } else {
        return false;
      }
    }
    e.cancel = await isCanceled();
  }

  async validateRemove(e) {
    // debugger
    const isCanceled = async () => {
      const removido = await this._pedidoService.removePedido(e.key).toPromise();
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
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxSelectBoxModule,
    DxLoadPanelModule,
    FirstKeysToConsolePipeModule,
  ],
  declarations:[ PedidoListComponent ],
  exports:[ PedidoListComponent ]
})
export class PedidoListModule{}
