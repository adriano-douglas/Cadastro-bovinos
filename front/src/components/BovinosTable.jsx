import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TextField, Grid, CircularProgress } from '@mui/material';
import { bovinoService } from '../services/bovinoService';
import moment from 'moment';

const colunas = [
  { campo: "brinco", label: "Brinco" },
  { campo: "nome", label: "Nome" },
  { campo: "raca", label: "Raça" },
  { campo: "sexo", label: "Sexo" },
];

const formattedDate = (date) => {
  return moment(date).isValid() ? moment(date).format('DD/MM/YYYY') : '';
}

const BovinosTable = ({ loading, setLoading, bovinos, setBovinos }) => {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [consulta, setConsulta] = useState("");

  const handleConsulta = async (e) => {
    setLoading(true)
    const entrada = e.target.value;
    setConsulta(entrada);
    
    if(entrada.length === 0) {
        const bovinos = await bovinoService.fetchBovinos();
        setBovinos(bovinos);
        setLoading(false);
        return;
    }

    const bovinos = await bovinoService.fetchBovinosPorBrincoOuNome(entrada);
    setBovinos(bovinos);
    setLoading(false)
  }

  function handleOrdenarClick(campo) {
    if (orderBy === campo && order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setOrderBy(campo);
  }

  const animaisOrdenados = bovinos.sort((a, b) => {
    const isAsc = order === "asc";
    if (a[orderBy] < b[orderBy]) {
      return isAsc ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return isAsc ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={6} marginBottom={2}>
          <TextField value={consulta} onChange={handleConsulta} label='Buscar' placeholder='Pesquise por brinco ou nome' fullWidth/>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {colunas.map((coluna) => (
                <TableCell key={coluna.campo} style={{fontWeight: 'bold'}}>
                  <TableSortLabel
                    active={orderBy === coluna.campo}
                    direction={orderBy === coluna.campo ? order : "asc"}
                    onClick={() => handleOrdenarClick(coluna.campo)}
                  >
                    {coluna.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell style={{fontWeight: 'bold'}}>Situação</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Brinco do pai</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Brinco da mãe</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Data Nascimento</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Data da Prenhes</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Data Último Parto</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Data Próximo Parto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <TableRow>
                <TableCell><CircularProgress color="secondary"/></TableCell>
              </TableRow>
            }
            {
              !loading && animaisOrdenados.length === 0 &&
              <TableRow>
                <TableCell colSpan={3}>Nenhum registro encontrado.</TableCell>
              </TableRow>
            }
            {!loading && 
            animaisOrdenados.map((animal) => (
              <TableRow key={animal.brinco}>
                <TableCell>{animal.brinco}</TableCell>
                <TableCell>{animal.nome}</TableCell>
                <TableCell>{animal.raca}</TableCell>
                <TableCell>{animal.sexo}</TableCell>
                <TableCell>{animal.situacao}</TableCell>
                <TableCell>{animal.pai ? animal.pai.brinco : ''}</TableCell>
                <TableCell>{animal.mae ? animal.mae.brinco : ''}</TableCell>
                <TableCell>{formattedDate(animal.data_nascimento)}</TableCell>
                <TableCell>{formattedDate(animal.data_prenhes)}</TableCell>
                <TableCell>{formattedDate(animal.data_ultimo_parto)}</TableCell>
                <TableCell>{formattedDate(moment(animal.data_prenhes).add(9, 'months'))}</TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BovinosTable;