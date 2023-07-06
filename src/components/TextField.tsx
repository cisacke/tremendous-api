import {
  TextField as MaterialUITextField,
  TextFieldProps,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { get } from "lodash";

type TextField<T extends {}> = TextFieldProps & {
  name: string;
  fieldName: string;
  index: number;
  formikProps: FormikProps<T>;
};

export const TextField = <T extends {}>({
  formikProps: { handleBlur, errors, touched, values, setFieldValue },
  index,
  fieldName,
  name,
  ...rest
}: TextField<T>) => {
  const formikName = `${name}.${index}.${fieldName}`;
  const formValue = get(values, [name, index, fieldName]);
  const error =
    get(touched, [name, index, fieldName]) &&
    Boolean(get(errors, [name, index, fieldName]));
  const helperText =
    get(touched, [name, index, fieldName]) &&
    get(errors, [name, index, fieldName]);

  return (
    <MaterialUITextField
      sx={{ mr: 2 }}
      name={formikName}
      value={formValue}
      onChange={(e) => setFieldValue(formikName, e.target.value)}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
      {...rest}
    />
  );
};
