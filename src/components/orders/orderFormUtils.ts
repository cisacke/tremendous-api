import * as yup from "yup";
import { Campaign, FundingSource } from "./OrderForm";
import { startCase } from "lodash";
import { formatDollars } from "@/utils";

export const emptyRecipient = {
  name: "",
  email: "",
  denomination: 0,
};

export type OrderFormValues = {
  fundingSourceId: string;
  campaignId: string;
  deliveryMethod: string;
  recipients: Array<{
    name: string;
    email: string;
    denomination: number;
  }>;
};

export const validationSchema = yup.object({
  fundingSourceId: yup.string().required("Required"),
  campaignId: yup.string().required("Required"),
  deliveryMethod: yup.string().required("Required"),
  recipients: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Required"),
      email: yup.string().email("Invalid email").required("Required"),
      denomination: yup.number().required("Required"),
    })
  ),
});

export const formatData = (data: OrderFormValues) => ({
  payment: {
    funding_source_id: data.fundingSourceId,
  },
  rewards: data.recipients.map((recipient) => ({
    value: {
      currency_code: "USD",
      denomination: recipient.denomination,
    },
    recipient: {
      name: recipient.name,
      email: recipient.email,
    },
    campaign_id: data.campaignId,
    delivery: {
      method: data.deliveryMethod,
    },
  })),
});

export const initialValues = {
  fundingSourceId: "",
  campaignId: "",
  deliveryMethod: "EMAIL",
  recipients: [],
};

export const formatFundingSourceOptions = (fundingSources: FundingSource[]) =>
  fundingSources.map(({ id, method, meta: { available_cents } }) => ({
    value: id,
    label: `${startCase(method)} (${formatDollars(
      available_cents / 100
    )} available)`,
  }));

export const formatCampaignOptions = (campaigns: Campaign[]) =>
  campaigns.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const deliveryMethodOptions = [
  { value: "EMAIL", label: "Email" },
  { value: "LINK", label: "Link" },
];
