import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DxDataGridModule, DxLoadPanelModule, DxSelectBoxModule, DxSpeedDialActionModule} from "devextreme-angular";

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
