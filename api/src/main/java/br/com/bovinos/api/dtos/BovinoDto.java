package br.com.bovinos.api.dtos;

import br.com.bovinos.api.validation.constraints.ValidateString;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BovinoDto {
    @NotBlank
    @Size(min = 1, max = 8)
    private String brinco;
    @NotBlank
    @Size(min = 1, max = 20)
    private String nome;
    @ValidateString(acceptedValues = {"Em Lactação", "Seca", "Vendido", "Morto"})
    private String situacao;
    @ValidateString(acceptedValues = {"M", "F"})
    private String sexo;
    @ValidateString(acceptedValues = {"Girolando", "Holandês", "Gir", "Jersey"})
    private String raca;
    @Past
    @NotNull
    private LocalDate data_nascimento;
    @Past
    private LocalDate data_prenhes;
    @Past
    private LocalDate data_ultimo_parto;
    @Size(max = 8)
    private String mae_brinco;
    @Size(max = 8)
    private String pai_brinco;
}
