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
  itens: ItemPedido[] = []

  selectedRowIndex = -1;
  isLoading = false;

  constructor(private _pedidoService: PedidoService,
              private _clienteService: ClienteService,
              private _produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getClientesCell();
    this.getProdutosCell();
    this.reloadDados();
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
      return produto.id + " - " + produto.nomeProduto;
    else
      return produto;
  }

  getPedidoSave(e){
    debugger
    this.produto = e.data;
    console.log(this.produto)
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
    // debugger
    this.isLoading = true;
    this.pedidos = this.pedidos = await this._pedidoService.getPedidoList().toPromise();
    this.isLoading = false;
  }

  async insertRow(e){
    // debugger
    // console.log(e);
    const isCanceled = async () => {
      const dialogResult = await window.confirm("Deseja realemnte Criar um novo produto?");
      if (dialogResult) {
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
        const atualizarPedido = await this._pedidoService.updatePedido({ params: e.key }).toPromise();
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
