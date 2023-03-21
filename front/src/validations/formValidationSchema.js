import * as yup from 'yup';
import moment from 'moment/moment';

const formValidationSchema = yup.object().shape({
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
    pai_brinco: yup.string().nullable().max(8, "O brinco deve ter no máximo 8 caracteres."),
    mae_brinco: yup.string().nullable().max(8, "O brinco deve ter no máximo 8 caracteres."),
    sexo: yup.string().required("O sexo é obrigatório."),
    data_nascimento: yup.string().transform((value, originalValue) => {
        if(originalValue){
            const date = new Date(originalValue)
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : originalValue;
        }
      })
      .typeError('Data inválida').required("A data de nascimento é obrigatória."),
    data_prenhes: yup.string().nullable().transform((value, originalValue) => {
        if(originalValue){
            const date = new Date(originalValue)
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
        }
    }),
    data_ultimo_parto: yup.string().nullable().transform((value, originalValue) => {
        if(originalValue){
            const date = new Date(originalValue)
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
        }
    })
  });

  export default formValidationSchema;