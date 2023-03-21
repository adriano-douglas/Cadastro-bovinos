import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';

const MuiAutocomplete = ({ name, control, label, options, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!errors[name]}
              helperText={errors?.[name]?.message}
            />
          )}
        />
      )}
    />
  )
}

export default MuiAutocomplete