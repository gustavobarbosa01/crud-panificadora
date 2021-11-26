import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Estado} from "../model/estado";
import {Cidade} from "../model/cidade";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CidadesEstadosService {


  constructor(private _http: HttpClient) { }

  getEstados(){
    return this._http.get<Estado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getCidades(idEstado){
    return this._http.get<Cidade[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ idEstado + '/municipios');
  }
}
