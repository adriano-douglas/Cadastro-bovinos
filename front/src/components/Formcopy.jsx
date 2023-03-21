import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText, FormControlLabel, RadioGroup, Radio, FormLabel, Autocomplete, Grid, DialogActions } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment/moment';
import dayjs from "dayjs";

const schema = yup.object().shape({
    brinco: yup
      .string()
      .required("O brinco é obrigatório.")
      .max(8, "O brinco deve ter no máximo 8 caracteres."),
    nome: yup
      .string()
      .required("O nome é obrigatório.")
      .max(15, "O nome deve ter no máximo 15 caracteres."),
    situacao: yup.string().required("A situação é obrigatória."),
    raca: yup.string().required("A raça é obrigatória."),
    brinco_pai: yup.string().nullable().max(8, "O brinco deve ter no máximo 8 caracteres."),
    brinco_mae: yup.string().nullable().max(8, "O brinco deve ter no máximo 8 caracteres."),
    sexo: yup.string().required("O sexo é obrigatório."),
    dataNascimento: yup.string().transform((value, originalValue) => {
        if(originalValue){
            const date = new Date(originalValue)
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : originalValue;
        }
      })
      .typeError('Data inválida').required("A data de nascimento é obrigatória."),
    dataPrenhes: yup.string().nullable().transform((value, originalValue) => {
        if(originalValue){
            const date = new Date(originalValue)
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
        }
      }),
    dataUltimoParto: yup.string().nullable().transform((value, originalValue) => {
        if(originalValue){
            const date = new Date(originalValue)
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
        }
      })
  });

const Formcopy = (props) => {
    const [brincosMacho, setBrincosMacho] = useState([]);
    const [brincosFemea, setBrincosFemea] = useState([]);
    const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
    
    const onSubmit = (data) => {
        console.log(data);
    };

    const dataNas = watch('dataNascimento');
    const sex = watch('sexo');
    const sit = watch('situacao');

    if(sex === 'M' && sit === 'Em lactação') setValue('situacao', '');
    if(sex === 'M') {setValue('dataUltimoParto', null); setValue('dataPrenhes', null)}

    useEffect(() => {
        // Função para buscar os brincos dos animais macho cadastrados
        const fetchBrincosMacho = async () => {
            try {
              const response = await axios.get('/api/animais/machos');
              const machos = response.data;
          
              setBrincosMacho(machos);
            } catch (error) {
              //console.error(error);
              const animaisMacho = ['0001', '0002', '0003', '0004', '0005'];
              setBrincosMacho(animaisMacho);
            }
          };
    
        // Função para buscar os brincos das animais fêmea cadastradas
        const fetchBrincosFemea = async () => {
            try {
              const response = await axios.get('/api/animais/femeas');
              const femeas = response.data;
          
              setBrincosFemea(femeas);
            } catch (error) {
              //console.error(error);
              setBrincosFemea(["ABCdddddddddd", "DEF", "GHI"]);
            }
          };
    
        fetchBrincosMacho();
        fetchBrincosFemea();
      }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container xs={12} rowGap={2} justifyContent='center'>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Brinco"
                        variant="outlined"
                        {...register("brinco")}
                        error={!!errors.brinco}
                        helperText={errors.brinco?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        {...register("nome")}
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="sexo">Sexo</FormLabel>
                    <Controller
                        name="sexo"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                        <RadioGroup {...field} aria-labelledby="sexo" row>
                            <FormControlLabel
                            value="F"
                            control={<Radio />}
                            label="Fêmea"
                            />
                            <FormControlLabel
                            value="M"
                            control={<Radio />}
                            label="Macho"
                            />
                        </RadioGroup>
                        )}
                    />
                    {errors.sexo && (
                        <p className='error'>{errors.sexo.message}</p>
                    )}
                </FormControl>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                    <InputLabel id="situacao">Situação</InputLabel>
                        <Select
                            labelId="situacao"
                            label="Situação"
                            variant="outlined"
                            {...register("situacao")}
                            error={!!errors.situacao}
                            defaultValue=""
                        >
                            {(sex === 'F' || sex === '') &&
                                <MenuItem value="Em lactação">Em lactação</MenuItem>
                            }
                            <MenuItem value="Seca">Seca</MenuItem>
                            <MenuItem value="Morto">Morto</MenuItem>
                            <MenuItem value="Vendido">Vendido</MenuItem>
                        </Select>
                        <FormHelperText error>{errors.situacao?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="raca">Raça</InputLabel>
                        <Select
                            labelId="raca"
                            label="Raça"
                            variant="outlined"
                            {...register("raca")}
                            error={!!errors.raca}
                            defaultValue=""
                        >
                            <MenuItem value="Gir">Gir</MenuItem>
                            <MenuItem value="Girolando">Girolando</MenuItem>
                            <MenuItem value="Holandês">Holandês</MenuItem>
                            <MenuItem value="Jersey">Jersey</MenuItem>
                        </Select>
                        <FormHelperText error>{errors.raca?.message}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="brinco_pai"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={brincosMacho}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Brinco do Pai" variant="outlined" error={!!errors.brinco_pai} helperText={errors?.brinco_pai?.message} />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="brinco_mae"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={brincosFemea}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Brinco da Mãe" variant="outlined" error={!!errors.brinco_mae} helperText={errors?.brinco_mae?.message} />
                                )}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormControl error={!!errors.dataNascimento}>
                        <Controller
                            name="dataNascimento"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                            <DesktopDatePicker
                                label="Data de nascimento"
                                value={field.value}
                                onChange={field.onChange}
                                format="DD/MM/YYYY"
                                maxDate={dayjs(Date.now())}
                            />
                            )}
                        />
                    <FormHelperText error>{errors.dataNascimento?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    {sex === 'F' &&
                        <Controller
                            name="dataPrenhes"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                            <DesktopDatePicker
                                label="Data da Prenhes"
                                value={field.value}
                                onChange={field.onChange}
                                format="DD/MM/YYYY"
                                maxDate={dayjs(Date.now())}
                                minDate={dayjs(dataNas)}
                            />
                            )}
                        />
                    }
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                {sex === "F" &&
                    <Controller
                        name="dataUltimoParto"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                        <DesktopDatePicker
                            label="Data do útimo parto"
                            value={field.value}
                            onChange={field.onChange}
                            format="DD/MM/YYYY"
                            maxDate={dayjs(Date.now())}
                            minDate={dayjs(dataNas)}
                        />
                        )}
                    />
                }
            </Grid>
            <Grid container item xs={12}>
                <DialogActions style={{padding: 0}}>
                    <Button onClick={props.onClose} variant='contained' color="secondary">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Enviar
                    </Button>
                </DialogActions>
            </Grid>
      </Grid>
    </form>
  )
}

export default Formcopy