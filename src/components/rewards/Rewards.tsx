import { fetchAPI } from "@/utils";
import React, { useEffect, useState } from "react";
import { RewardsList } from "./RewardsList";

export const Rewards = () => {
  const [rewards, setRewards] = useState([]);

  const fetchRewards = () => {
    fetchAPI("/api/v2/rewards").then((resp) => {
      setRewards(resp.data.rewards);
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
