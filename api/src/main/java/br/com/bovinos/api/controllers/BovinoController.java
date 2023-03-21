package br.com.bovinos.api.controllers;

import br.com.bovinos.api.dtos.BovinoDto;
import br.com.bovinos.api.exceptions.ConflictException;
import br.com.bovinos.api.models.BovinoModel;
import br.com.bovinos.api.services.BovinoService;
import br.com.bovinos.api.exceptions.NotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/bovino")
public class BovinoController {
    @Autowired
    private BovinoService bovinoService;

    @PostMapping
    public ResponseEntity<BovinoModel> saveBovino(@RequestBody @Valid BovinoDto bovinoDto) throws ConflictException, NotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(bovinoService.save(bovinoDto));
    }

    @GetMapping
    public ResponseEntity<List<BovinoModel>> getAllBovinos(){
        return ResponseEntity.status(HttpStatus.OK).body(bovinoService.findAll());
    }

    @GetMapping("/buscar/{consulta}")
    public  ResponseEntity<List<BovinoModel>> getBovinosByBrincoOrNome(@PathVariable(value = "consulta") String consulta){
        return  ResponseEntity.status(HttpStatus.OK).body(bovinoService.findBovinosByBrincoOrNome(consulta));
    }

    @GetMapping("/machos/brincos")
    public ResponseEntity<List<String>> getAllBovinosMachos() {
        return ResponseEntity.status(HttpStatus.OK).body(bovinoService.findAllBrincosBovinosMachos());
    }

    @GetMapping("/femeas/brincos")
    public ResponseEntity<List<String>> getAllBovinosFemeas() {
        return ResponseEntity.status(HttpStatus.OK).body(bovinoService.findAllBrincosBovinosFemeas());
    }

    @GetMapping("/{brinco}")
    public ResponseEntity<BovinoModel> getOneBovino(@PathVariable(value = "brinco") String brinco) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(bovinoService.findByBrinco(brinco));
    }

}
