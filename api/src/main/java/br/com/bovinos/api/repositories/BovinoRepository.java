package br.com.bovinos.api.repositories;

import br.com.bovinos.api.models.BovinoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BovinoRepository extends JpaRepository<BovinoModel, String> {
    Optional<BovinoModel> findByBrinco(String brinco);

    List<BovinoModel> findBySexo(String sexo);

    List<BovinoModel> findByBrincoContainingIgnoreCase(String brinco);

    List<BovinoModel> findByNomeContainingIgnoreCase(String nome);

    boolean existsByBrinco(String brinco);

    boolean existsByNome(String nome);
}
