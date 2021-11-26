import {Component, OnInit,} from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  estadoLocation: string = "";
  cidadeLocation: string = "";

  constructor() { }

  ngOnInit(): void {

  }

  onChangeEstado(event: any){
    this.estadoLocation = event
    // console.log(event);//capturando eventos do
  }

  onChangeCidade(event: any){
    this.cidadeLocation = event.cidadeNome
    // console.log(event);
  }





}

