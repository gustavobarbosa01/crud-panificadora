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

  constructor() { }

  ngOnInit(): void {
  }

}

