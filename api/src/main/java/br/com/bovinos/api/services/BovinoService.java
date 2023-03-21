package br.com.bovinos.api.services;

import br.com.bovinos.api.dtos.BovinoDto;
import br.com.bovinos.api.exceptions.ConflictException;
import br.com.bovinos.api.models.BovinoModel;
import br.com.bovinos.api.exceptions.NotFoundException;
import br.com.bovinos.api.repositories.BovinoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BovinoService {
    @Autowired
    private BovinoRepository bovinoRepository;
    @Transactional
    public BovinoModel save(BovinoDto bovinoDto) throws ConflictException, NotFoundException {
        if(bovinoRepository.existsByBrinco(bovinoDto.getBrinco()))
            throw new ConflictException("O brinco informado já está cadastrado");
        if(bovinoRepository.existsByNome(bovinoDto.getNome()))
            throw new ConflictException("O nome informado já está cadastrado");
        if(bovinoDto.getSexo().equals("M")){
            bovinoDto.setData_prenhes(null);
            bovinoDto.setData_ultimo_parto(null);
        }
        var bovinoModel = new BovinoModel();
        if(bovinoDto.getMae_brinco() != null){
            Optional<BovinoModel> bovinoModelOptional = bovinoRepository.findByBrinco(bovinoDto.getMae_brinco());
            if(bovinoModelOptional.isPresent()){
                if(bovinoModelOptional.get().getSexo().equals("M"))
                    throw new ConflictException("O brinco da mãe informado não pertence a um animal fêmea");
                bovinoModel.setMae(bovinoModelOptional.get());
            }else throw new NotFoundException("O brinco da mãe não foi encontrado");
        }
        if(bovinoDto.getPai_brinco() != null){
            Optional<BovinoModel> bovinoModelOptional = bovinoRepository.findByBrinco(bovinoDto.getPai_brinco());
            if(bovinoModelOptional.isPresent()){
                if(bovinoModelOptional.get().getSexo().equals("F"))
                    throw new ConflictException("O brinco do pai informado não pertence a um animal macho");
                bovinoModel.setPai(bovinoModelOptional.get());
            }else throw new NotFoundException("O brinco do pai não foi encontrado");
        }
        BeanUtils.copyProperties(bovinoDto, bovinoModel);
        return bovinoRepository.save(bovinoModel);
    }
    public List<BovinoModel> findAll() {
        return bovinoRepository.findAll();
    }
    public List<String> findAllBrincosBovinosMachos() {
        List<BovinoModel> bovinosMachos = bovinoRepository.findBySexo("M");
        List<String> brincosBovinosMachos = new ArrayList<>();
        for (BovinoModel bovino : bovinosMachos) {
            brincosBovinosMachos.add(bovino.getBrinco());
        }
        return brincosBovinosMachos;
    }

    public List<String> findAllBrincosBovinosFemeas() {
        List<BovinoModel> bovinosFemeas = bovinoRepository.findBySexo("F");
        List<String> brincosBovinosFemeas = new ArrayList<>();
        for (BovinoModel bovino : bovinosFemeas) {
            brincosBovinosFemeas.add(bovino.getBrinco());
        }
        return brincosBovinosFemeas;
    }

    public List<BovinoModel> findBovinosByBrincoOrNome(String consulta) {
        Set<BovinoModel> bovinos = new HashSet<>();
        bovinos.addAll(bovinoRepository.findByBrincoContainingIgnoreCase(consulta));
        bovinos.addAll(bovinoRepository.findByNomeContainingIgnoreCase(consulta));

        return new ArrayList<BovinoModel>(bovinos);
    }

    public BovinoModel findByBrinco(String brinco) throws NotFoundException {
        Optional<BovinoModel> bovinoModelOptional = bovinoRepository.findByBrinco(brinco);
        if(!bovinoModelOptional.isPresent()){
            throw new NotFoundException("Bovino não encontrado");
        }
        return bovinoModelOptional.get();
    }
}
