import React from 'react'
import { Controller } from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

const MuiDatePicker = ({ name, control, label, minDate }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <DesktopDatePicker
          label={label}
          value={field.value}
          onChange={field.onChange}
          format="DD/MM/YYYY"
          maxDate={dayjs(Date.now())}
          minDate={minDate ? dayjs(minDate) : null}
        />
      )}
    />
  )
}

export default MuiDatePicker