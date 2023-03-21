import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Navbar = (props) => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
                CADASTRO DE BOVINOS
            </Typography>
            <Stack direction="row">
                <Button onClick={props.onButtonClick} variant='contained' color='secondary'>NOVO</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar