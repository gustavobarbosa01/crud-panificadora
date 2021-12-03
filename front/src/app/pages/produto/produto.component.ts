import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../shared/model/cliente";
import {Change} from "../../shared/services";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  clientes: Cliente[] = [];
  changes: Change<Cliente>[] = [];
  editRowKey?: number = null;
  selectedRowIndex = -1;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

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

}

