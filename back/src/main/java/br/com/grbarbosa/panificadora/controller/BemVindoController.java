package br.com.grbarbosa.panificadora.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BemVindoController {

    @RequestMapping("/")
    @ResponseBody
    public String bemVindo() {
        return "Bem vindos a Nossa Panificadora!!!";
    }


}
