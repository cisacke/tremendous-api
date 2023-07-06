"use client";
import { Orders } from "@/components/orders/Orders";
import { Products } from "@/components/products/Products";
import { Rewards } from "@/components/rewards/Rewards";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ borderBottom: 1, borderColor: "gray", marginBottom: 5 }}>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Orders" value={0} />
          <Tab label="Products" value={1} />
          <Tab label="Rewards" value={2} />
        </Tabs>
      </Box>

      {currentTab === 0 && <Orders />}
      {currentTab === 1 && <Products />}
      {currentTab === 2 && <Rewards />}
    </>
  );
};

export default Home;
