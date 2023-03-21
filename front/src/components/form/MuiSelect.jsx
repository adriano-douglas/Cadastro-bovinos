import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const MuiSelect = ({ labelId, sex, extraMenuItem, label, options, register, name, errors }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        variant="outlined"
        {...register(name)}
        error={!!errors[name]}
      >
        {extraMenuItem && (sex === 'F' || sex === '') &&
          <MenuItem value="Em Lactação">Em Lactação</MenuItem>
        }
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{errors[name]?.message}</FormHelperText>
    </FormControl>
  )
}

export default MuiSelect