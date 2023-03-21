import { Alert, Snackbar } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'

import "./App.css"
import BovinosTable from './components/BovinosTable'
import FormDialog from './components/FormDialog'
import Navbar from './components/Navbar'
import { bovinoService } from './services/bovinoService'

const App = () => {
  const [open, setOpen] = useState(false);
  const [bovinos, setBovinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [type, setType] = useState('success');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarOpen = (messages, type) => {
    setMessages(messages);
    setType(type);
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  }

  const updateTable = async () => {
    const bovinos = await bovinoService.fetchBovinos();
    setBovinos(bovinos);
    setLoading(false);
  };

  useEffect(() => {
    updateTable();
  }, []);

  return (
    <div>
      <Navbar onButtonClick={handleOpen}/>
      <div className="container">
        <BovinosTable loading={loading} setLoading={setLoading} bovinos={bovinos} setBovinos={setBovinos}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormDialog open={open} handleSnackbarOpen={handleSnackbarOpen} handleClose={handleClose} updateTable={updateTable}/>
        </LocalizationProvider>
      </div>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={type}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App