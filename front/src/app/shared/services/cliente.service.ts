import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, EMPTY, Observable, of} from "rxjs";
import {Cliente} from "../model/cliente";
// import applyChanges from "devextreme/data/apply_changes";

export class Change<T> {
  type: 'insert' | 'update' | 'remove';

  key: any;

  data: Partial<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // private orders$ = new BehaviorSubject<Cliente[]>([]);

  constructor( private _http: HttpClient ) { }

  private baseUrl: string = '/api/clientes';

  //Observables CRUD url metodos http

  getClientesList(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(`${this.baseUrl}`);
  }

  insertCliente(data: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${this.baseUrl}`, data);
  }

  updateCliente(data: Cliente): Observable<Cliente> {
    //console.log(data);
    return this._http.put<Cliente>(`${this.baseUrl}/${data.id}`, data);
  }

  removeCliente(data: Cliente): Observable<any> {
    return this._http.delete<Cliente>(`${this.baseUrl}/${data.id}`);
  }

  // saveChange(change: any) {
  //   if (change.type === 'insert')
  //     return this.insertCliente(change.data)
  //   else if(change.type === 'update')
  //     return this.updateCliente(change.data, change.key);
  //   else if(change.type === 'remove')
  //     return this.removeCliente(change.key);
  //   else
  //     return EMPTY;
  // }




  // else if(change.type === 'update'){
  // if(change.data.nome === 'undefined'){
  //   return this.update(change.data.codigo, change.key );
  // }
  // if(change.data.codigo === 'undefined'){
  //   return this.update(change.nome, change.key );
  // }else{
  //   return EMPTY;
  // }
  // applyChanges([data],[change.key], {keyExpr:'id'});
  // console.log(change.data.nome, change.data.codigo, change.key);
  // return this.update(change, change.key, );
}
