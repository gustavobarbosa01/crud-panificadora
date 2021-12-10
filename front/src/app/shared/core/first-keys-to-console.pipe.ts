import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstKeys'
})
export class FirstKeysToConsolePipe implements PipeTransform {

  transform(value: any): any {
    if(value){
      console.log('--------- Imprimindo Chaves --------');
      for(let x in value) {
        console.log("Chave: ", x, ", Valor: ", value[x])
      }
    }
    return null;
  }
}

@NgModule({
  imports:[
  ],
  declarations:[ FirstKeysToConsolePipe ],
  exports:[ FirstKeysToConsolePipe ]
})
export class FirstKeysToConsolePipeModule{}
