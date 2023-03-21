package br.com.bovinos.api.models;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
@Entity
@Data
@Table(name = "TB_BOVINO")
public class BovinoModel implements Serializable {
    private static final long serialVersionID = 1L;
    @Id
    @Column(length = 8)
    private String brinco;
    @Column(nullable = false, length = 20, unique = true)
    private String nome;
    @Column(nullable = false, length = 15)
    private String situacao;
    @Column(nullable = false, length = 1)
    private String sexo;
    @Column(nullable = false, length = 15)
    private String raca;
    @Column(nullable = false)
    private LocalDate data_nascimento;
    private LocalDate data_prenhes;
    private LocalDate data_ultimo_parto;
    @OneToOne
    @JoinColumn(name = "mae_brinco")
    private BovinoModel mae;
    @OneToOne
    @JoinColumn(name = "pai_brinco")
    private BovinoModel pai;
}
