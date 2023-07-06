import React, { FC } from "react";
import { Field as FormikField, FormikProps } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps<T extends {}> = SelectProps & {
  name: keyof T;
  formikProps: FormikProps<T>;
  options: Option[];
};

export const SelectField = <T extends {}>({
  formikProps: { handleBlur, handleChange, errors, touched, values },
  name,
  options,
  ...rest
}: SelectFieldProps<T>) => (
  <FormControl fullWidth sx={{ mb: 3 }}>
    <InputLabel id={`select-${name}`}>{rest.label}</InputLabel>
    <Select
      labelId={`select-${name}`}
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched[name] && Boolean(errors[name] as string)}
      {...rest}
    >
      {options.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>{(touched[name] && errors[name]) as string}</FormHelperText>
  </FormControl>
);
