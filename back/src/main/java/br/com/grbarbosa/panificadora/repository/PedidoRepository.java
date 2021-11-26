package br.com.grbarbosa.panificadora.repository;

import br.com.grbarbosa.panificadora.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
