import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pedido} from "../model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor( private _http: HttpClient ) { }

  private baseUrl: string = 'api/pedidos';

  getPedidoList(): Observable<any> {
    return this._http.get<Pedido[]>(`${this.baseUrl}`);
  }

  insertPedido(data: any): Observable<Pedido> {
    return this._http.post<Pedido>(`${this.baseUrl}/`, data.params);
  }

  updatePedido(data: any): Observable<Pedido> {
    return this._http.put<Pedido>(`${this.baseUrl}/`, data.params);
  }

  removePedido(data: any): Observable<any> {
    return this._http.delete<Pedido>(`${this.baseUrl}/${data.id}`, data);
  }
}
