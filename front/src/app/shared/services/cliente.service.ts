import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private http: HttpClient ) { }

  private baseUrl = 'http://localhost:8080/clientes';

  getClientesList(): Observable<any> {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

}
