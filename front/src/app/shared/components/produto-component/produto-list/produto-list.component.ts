import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxSpeedDialActionModule
} from "devextreme-angular";
import {Change, ProdutoService} from "../../../services";
import {Produto} from "../../../model/produto";
import applyChanges from "devextreme/data/apply_changes";
import {HttpParams} from "@angular/common/http";
import DevExpress from "devextreme";
import data = DevExpress.data;

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  produtos: Produto[] = [];
  changes: Change<Produto>[] = [];
  editRowKey?: number = null;
  selectedRowIndex = -1;
  isLoading = false;
  // errorText: any;

  constructor(private _produtoService: ProdutoService) { }

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
    this.isLoading = true;
    this.produtos = this.produtos = await this._produtoService.getProdutoList().toPromise();
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
        const novoProduto = await this._produtoService.insertProduto({ params: e.data }).toPromise();
        this.reloadDados();
        if (novoProduto) {
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
        const atualizaProduto = await this._produtoService.updateProduto({ params: e.key }).toPromise();
        if (atualizaProduto) {
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
      const removido = await this._produtoService.removeProduto(e.key).toPromise();
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
  declarations:[ ProdutoListComponent ],
  exports:[ ProdutoListComponent ]
})
export class ProdutoListModule{}
