import {Cliente} from "./cliente";
import {ItemPedido} from "./item-pedido";

export class Pedido{
  id: number;
  numeroPedido: number;
  dataCriacao: Date;
  cliente: Cliente;
  itens: Array<ItemPedido>[]=[];
  totalPedido: number;
}


