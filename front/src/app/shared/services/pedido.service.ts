import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../model/produto";
import {Pedido} from "../model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor( private _http: HttpClient ) { }

  private baseUrl: string = 'http://localhost:8080/pedidos';

  getPedidoList(): Observable<any> {
    debugger
    return this._http.get<Pedido[]>(`${this.baseUrl}`);
  }

  insertPedido(data: any): Observable<Pedido> {
    return this._http.post<Pedido>(`${this.baseUrl}`, data.params);
  }

  updatePedido(data: any): Observable<Pedido> {
    return this._http.put<Pedido>(`${this.baseUrl}/${data.params.id}`, data.params);
  }

  removePedido(data: any): Observable<any> {
    return this._http.delete<Pedido>(`${this.baseUrl}/${data.id}`, data);
  }
}
