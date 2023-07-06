import React, { useEffect, useState } from "react";
import { OrdersList, Order } from "./OrdersList";
import { Box, Button, Modal } from "@mui/material";
import { OrderForm } from "./OrderForm";
import { fetchAPI } from "@/utils";
import { AxiosResponse } from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  borderRadius: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const Orders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    fetchAPI("/api/v2/orders")
      .then((resp) => {
        setOrders((resp as AxiosResponse).data.orders);
      })
      .catch((err) => setOrders([]));
  };

  const onClose = () => {
    setModalOpen(false);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 5 }}
      >
        Create Order
      </Button>
      <OrdersList orders={orders} refetchOrders={fetchOrders} />
      {modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={style}>
            <OrderForm onClose={onClose} />
          </Box>
        </Modal>
      )}
    </>
  );
};
