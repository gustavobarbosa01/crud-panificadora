import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../model/produto";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor( private _http: HttpClient ) { }

  private baseUrl: string = 'http://localhost:8080/produtos';

  getProdutoList(): Observable<any> {
    return this._http.get<Produto[]>(`${this.baseUrl}`);
  }

  insertProduto(data: any): Observable<Produto> {
    return this._http.post<Produto>(`${this.baseUrl}`, data.params);
  }

  updateProduto(data: any): Observable<Produto> {
    return this._http.put<Produto>(`${this.baseUrl}/${data.params.id}`, data.params);
  }

  removeProduto(data: any): Observable<any> {
    return this._http.delete<Produto>(`${this.baseUrl}/${data.id}`, data);
  }
}
