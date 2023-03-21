import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from './Form';

const FormDialog = ({ open, handleClose, updateTable, handleSnackbarOpen }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cadastro de bovinos</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={2}>
          Preencha os campos abaixo para enviar o formulário:
        </DialogContentText>
        <Form handleClose={handleClose} updateTable={updateTable} handleSnackbarOpen={handleSnackbarOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog