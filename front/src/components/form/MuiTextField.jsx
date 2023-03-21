import { TextField } from '@mui/material'
import React from 'react'

const MuiTextField = ({ label, name, register, errors }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      fullWidth
    />
  )
}

export default MuiTextField