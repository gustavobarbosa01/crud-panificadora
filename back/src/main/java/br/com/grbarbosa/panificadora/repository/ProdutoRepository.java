package br.com.grbarbosa.panificadora.repository;

import br.com.grbarbosa.panificadora.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
