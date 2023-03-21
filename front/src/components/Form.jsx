import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import formValidationSchema from "../validations/formValidationSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl, FormHelperText, Grid, DialogActions } from "@mui/material";
import MuiDatePicker from "./form/MuiDatePicker";
import MuiAutocomplete from "./form/MuiAutocomplete";
import MuiSelect from "./form/MuiSelect";
import MuiRadio from "./form/MuiRadio";
import MuiTextField from "./form/MuiTextField";
import { bovinoService } from '../services/bovinoService';

const Form = ({ handleClose, updateTable, handleSnackbarOpen }) => {
    const [brincosMacho, setBrincosMacho] = useState([]);
    const [brincosFemea, setBrincosFemea] = useState([]);

    const { control, register, reset, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(formValidationSchema),
      });
    
    const onSubmit = async (data) => {
        const response = await bovinoService.saveBovino(data);
        if(response.status === 201) {
            reset();
            handleClose();
            updateTable();
            handleSnackbarOpen(['Cadastro realizado com sucesso!'], 'success');
        }else{
            if(response && response.error) {
                handleSnackbarOpen([response.error], 'error');
            }else{
                const errorMessages = Object.keys(response).map(key => `${key}: ${response[key]}`);
                handleSnackbarOpen(errorMessages, 'error');
            }
        }
    };

    const dataNas = watch('data_nascimento');
    const sex = watch('sexo');
    const sit = watch('situacao');

    if(sex === 'M' && sit === 'Em Lactação') setValue('situacao', '');
    if(sex === 'M') {setValue('data_ultimo_parto', null); setValue('data_prenhes', null)}

    useEffect(() => {
        const fetchBrincos = async () => {
            const machos = await bovinoService.fetchBrincosMacho();
            const femeas = await bovinoService.fetchBrincosFemea();
        
            setBrincosMacho(machos);
            setBrincosFemea(femeas);
        };
      
        fetchBrincos();
    }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container xs={12} rowGap={2} justifyContent='center'>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <MuiTextField
                        label="Brinco"
                        name="brinco"
                        register={register}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MuiTextField
                        label="Nome"
                        name="nome"
                        register={register}
                        errors={errors}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <MuiRadio
                    name="sexo"
                    control={control}
                    label="Sexo"
                    options={[
                        { value: 'F', label: 'Fêmea' },
                        { value: 'M', label: 'Macho' },
                    ]}
                    errors={errors}
                />
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <MuiSelect
                        options={['Seca', 'Morto', 'Vendido']}
                        label="Situação"
                        labelId="situacao"
                        name="situacao"
                        errors={errors}
                        register={register}
                        sex={sex}
                        extraMenuItem={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MuiSelect
                        options={['Gir', 'Girolando', 'Holandês', 'Jersey']}
                        label="Raça"
                        labelId="raca"
                        name="raca"
                        errors={errors}
                        register={register}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                    <MuiAutocomplete
                        name="pai_brinco"
                        control={control}
                        label="Brinco do Pai"
                        options={brincosMacho}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MuiAutocomplete
                        name="mae_brinco"
                        control={control}
                        label="Brinco da Mãe"
                        options={brincosFemea}
                        errors={errors}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormControl error={!!errors.dataNascimento}>
                        <MuiDatePicker
                            name="data_nascimento"
                            control={control}
                            label="Data de nascimento"
                        />
                    <FormHelperText error>{errors.data_nascimento?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    {sex === 'F' &&
                        <MuiDatePicker
                            name="data_prenhes"
                            control={control}
                            label="Data da prenhes"
                            minDate={dataNas}
                        />
                    }
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                {sex === "F" &&
                    <MuiDatePicker
                        name="data_ultimo_parto"
                        control={control}
                        label="Data do último parto"
                        minDate={dataNas}
                    />
                }
            </Grid>
            <Grid container item xs={12}>
                <DialogActions style={{padding: 0}}>
                    <Button onClick={handleClose} variant='contained' color="secondary">
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

export default Form