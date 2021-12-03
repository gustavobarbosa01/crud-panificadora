package br.com.grbarbosa.panificadora.controller;

import br.com.grbarbosa.panificadora.exception.ResourceNotFoundException;
import br.com.grbarbosa.panificadora.model.Produto;
import br.com.grbarbosa.panificadora.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Produto cliente = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado para este id :: " + id));
        return ResponseEntity.ok().body(cliente);
    }
    @PostMapping
    public Produto cadastrarProduto(@RequestBody Produto produto){
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable(value = "id") Long id,
                                                 @RequestBody Produto produtoDetails) throws ResourceNotFoundException {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado para este id :: " + id));
        produto.setNomeProduto(produtoDetails.getNomeProduto());
        produto.setDescricao(produtoDetails.getDescricao());
        produto.setPrecoUnitario(produtoDetails.getPrecoUnitario());
        final Produto updatedProduto = produtoRepository.save(produto);

        return ResponseEntity.ok(updatedProduto);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteProduto(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado para este id :: " + id));

        produtoRepository.delete(produto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Produto Excluido com Sucesso!", Boolean.TRUE);
        return response;
    }
}
