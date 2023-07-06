import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TREMENDOUS_API_KEY}`,
  },
};

export const fetchAPI = async (endpoint: string) => {
  const resp = await axios.get(endpoint, config);

  return resp;
};

export const postAPI = async (endpoint: string, data: any) => {
  const resp = await axios.post(endpoint, data, config);

  return resp;
};

export const resendReward = async (id: string) =>
  await axios.post(`/api/v2/rewards/${id}/resend`, {}, config);

export const approveReward = async (id: string) =>
  await axios.post(`/api/v2/rewards/${id}/approve`, {}, config);

export const approveOrder = async (id: string) =>
  await axios.post(`/api/v2/orders/${id}/approve`, {}, config);

export const formatDollars = (num: number) => {
  return `$${num.toFixed(2)}`;
};
