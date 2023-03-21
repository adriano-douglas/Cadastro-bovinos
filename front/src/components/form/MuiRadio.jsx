import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const MuiRadio = ({ name, control, label, options, errors }) => {
  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <RadioGroup {...field} aria-labelledby={name} row>
            {options.map((option) => (
              <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
            ))}
          </RadioGroup>
        )}
      />
      {errors[name] && <p className='error'>{errors[name]?.message}</p>}
    </FormControl>
  )
}

export default MuiRadio