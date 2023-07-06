import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TREMENDOUS_API_KEY}`,
  },
};

export const fetchAPI = async (endpoint: string) =>
  await axios
    .get(endpoint, config)
    .catch((err: AxiosError) => toast(err.message));

export const postAPI = async (endpoint: string, data: any) =>
  await axios.post(endpoint, data, config).catch((err: AxiosError) => {
    toast(err.message);
  });

export const formatDollars = (num: number) => {
  return `$${num.toFixed(2)}`;
};
