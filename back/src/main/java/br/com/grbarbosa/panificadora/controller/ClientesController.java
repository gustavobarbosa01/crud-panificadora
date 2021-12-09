package br.com.grbarbosa.panificadora.controller;

import br.com.grbarbosa.panificadora.exception.ResourceNotFoundException;
import br.com.grbarbosa.panificadora.model.Cliente;
import br.com.grbarbosa.panificadora.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clientes")
public class ClientesController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado para este id :: " + id));
        return ResponseEntity.ok().body(cliente);
    }

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente){
        return clienteRepository.save(cliente);
    }

    @PutMapping("{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable(value = "id") Long id,
                                                 @RequestBody Cliente clienteDetails) throws ResourceNotFoundException {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado para este id :: " + id));

        cliente.setCodigo(clienteDetails.getCodigo());
        cliente.setNome(clienteDetails.getNome());

        final Cliente updatedCliente = clienteRepository.save(cliente);

        return ResponseEntity.ok(updatedCliente);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteCliente(@PathVariable(value = "id") Long clienteId)
            throws ResourceNotFoundException {
        Cliente produto = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado para este id :: " + clienteId));

        clienteRepository.delete(produto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Cliente Excluido com Sucesso!", Boolean.TRUE);
        return response;
    }


}
