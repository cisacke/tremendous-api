import { formatDollars, postAPI } from "@/utils";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { FC } from "react";
import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DateTime } from "luxon";

export type Order = {
  id: string;
  created_at: string;
  status: string;
  payment?: {
    total: number;
  };
  rewards?: Array<{}>;
};

interface OrdersListProps {
  orders: Order[];
  refetchOrders: () => void;
}

export const OrdersList: FC<OrdersListProps> = ({ orders, refetchOrders }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Rewards</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              {order.rewards?.length ? order.rewards.length : "N/A"}
            </TableCell>
            <TableCell>
              {order?.payment?.total
                ? formatDollars(order.payment.total)
                : "N/A"}
            </TableCell>
            <TableCell>
              {DateTime.fromISO(order.created_at).toLocaleString(
                DateTime.DATETIME_FULL
              )}
            </TableCell>
            <TableCell>
              {order.status === "PENDING APPROVAL" && (
                <Tooltip title="Approve Order">
                  <IconButton
                    onClick={() => {
                      postAPI(`/api/v2/orders/${order.id}/approve`, {}).then(
                        refetchOrders
                      );
                      toast("Order approved.", {
                        position: "top-right",
                        autoClose: 5000,
                      });
                    }}
                  >
                    <CheckCircleOutlineIcon color="success" />
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
