import {Pedido} from "./pedido";
import {Produto} from "./produto";

export class ItemPedido{
  id: number;
  pedido: Pedido;
  produto: Produto;
  quantidade: number;
  valorTotal: number;
}
