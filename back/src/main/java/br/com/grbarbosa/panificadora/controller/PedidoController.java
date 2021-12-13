package br.com.grbarbosa.panificadora.controller;

import br.com.grbarbosa.panificadora.exception.ResourceNotFoundException;
import br.com.grbarbosa.panificadora.model.ItemPedido;
import br.com.grbarbosa.panificadora.model.Pedido;
import br.com.grbarbosa.panificadora.repository.PedidoRepository;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public List<Pedido> listarPedidos(){
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado para este id :: " + id));
        return ResponseEntity.ok().body(pedido);
    }

    @PostMapping("/")
    public Pedido cadastrarPedido(@RequestBody Pedido pedido){

        BigDecimal total = BigDecimal.ZERO;
        for (ItemPedido item : pedido.getItens()) {

            item.setPedido(pedido);

            item.setValorTotal(item.getProduto()
                    .getPrecoUnitario()
                    .multiply(item.getQuantidade()));

            total = total.add(item.getValorTotal());
        }
        pedido.setTotalPedido(total);

        pedidoRepository.save(pedido);

        return pedido;
    }

    @PutMapping("/")
    public ResponseEntity<Pedido> updatePedido(@RequestBody Pedido pedido) {
        BigDecimal total = BigDecimal.ZERO;
        for (ItemPedido item : pedido.getItens()) {

            item.setPedido(pedido);
            pedido.setItens(item.getPedido().getItens());
            total = total.add(item.getValorTotal());
            item.setValorTotal(item.getProduto().getPrecoUnitario().multiply(item.getQuantidade()!=null ? item.getQuantidade() : BigDecimal.ZERO));
        }
        pedido.setTotalPedido(total);

        pedidoRepository.save(pedido);

        return ResponseEntity.ok(pedido);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deletePedido(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado para este id :: " + id));

        pedidoRepository.delete(pedido);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Pedido Excluido com Sucesso!", Boolean.TRUE);
        return response;
    }
}

