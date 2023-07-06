import { Box, Button, FormLabel } from "@mui/material";
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from "formik";
import React, { FC, useEffect, useState } from "react";
import { SelectField } from "../SelectField";
import { TextField } from "../TextField";
import { fetchAPI, postAPI } from "@/utils";
import {
  OrderFormValues,
  deliveryMethodOptions,
  emptyRecipient,
  formatCampaignOptions,
  formatData,
  formatFundingSourceOptions,
  initialValues,
  validationSchema,
} from "./orderFormUtils";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AxiosResponse } from "axios";

export type FundingSource = {
  id: string;
  method: string;
  meta: {
    available_cents: number;
  };
};

export type Campaign = {
  id: string;
  name: string;
};

interface OrderFormProps {
  onClose: () => void;
}

export const OrderForm: FC<OrderFormProps> = ({ onClose }) => {
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchAPI("/api/v2/funding_sources").then((resp) => {
      setFundingSources((resp as AxiosResponse).data.funding_sources);
    });

    fetchAPI("/api/v2/campaigns").then((resp) => {
      setCampaigns((resp as AxiosResponse).data.campaigns);
    });
  }, []);

  const onSubmit = (
    data: OrderFormValues,
    { resetForm }: FormikHelpers<OrderFormValues>
  ) =>
    postAPI("/api/v2/orders", formatData(data)).then(() => {
      resetForm();
      onClose();
    });

  return (
    <Formik<OrderFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <h1>Create Order</h1>
          <SelectField<OrderFormValues>
            name="fundingSourceId"
            label="Funding Source ID"
            formikProps={formikProps}
            required
            fullWidth
            options={formatFundingSourceOptions(fundingSources)}
          />
          <SelectField<OrderFormValues>
            name="campaignId"
            label="Campaign ID"
            formikProps={formikProps}
            required
            options={formatCampaignOptions(campaigns)}
          />
          <SelectField<OrderFormValues>
            name="deliveryMethod"
            label="Delivery Method"
            formikProps={formikProps}
            required
            options={deliveryMethodOptions}
          />
          <FormLabel sx={{ mb: 1, display: "inline-block" }}>
            Recipients
          </FormLabel>
          <FieldArray
            name="recipients"
            render={(arrayHelpers: ArrayHelpers) => (
              <div>
                {formikProps.values.recipients.map((_, index) => (
                  <Box key={index} sx={{ display: "flex", mb: 2 }}>
                    <TextField<OrderFormValues>
                      name="recipients"
                      fieldName="name"
                      formikProps={formikProps}
                      index={index}
                      label="Name"
                      required
                    />
                    <TextField<OrderFormValues>
                      name="recipients"
                      fieldName="email"
                      formikProps={formikProps}
                      index={index}
                      label="Email"
                      required
                    />
                    <TextField<OrderFormValues>
                      name="recipients"
                      fieldName="denomination"
                      formikProps={formikProps}
                      index={index}
                      label="Amount"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Box>
                ))}

                <Button
                  type="button"
                  onClick={() => arrayHelpers.push(emptyRecipient)}
                  sx={{ mb: 2 }}
                >
                  Add recipient
                </Button>
              </div>
            )}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
