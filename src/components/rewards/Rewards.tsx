import { fetchAPI } from "@/utils";
import React, { useEffect, useState } from "react";
import { RewardsList } from "./RewardsList";
import { AxiosResponse } from "axios";

export const Rewards = () => {
  const [rewards, setRewards] = useState([]);

  const fetchRewards = () => {
    fetchAPI("/api/v2/rewards").then((resp) => {
      setRewards((resp as AxiosResponse).data.rewards);
    });
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <>
      <RewardsList rewards={rewards} refetchRewards={fetchRewards} />
    </>
  );
};
