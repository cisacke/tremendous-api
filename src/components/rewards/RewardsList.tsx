import { approveReward, formatDollars, resendReward } from "@/utils";
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
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import { DateTime } from "luxon";

export type Reward = {
  id: string;
  created_at: string;
  recipient: {
    name: string;
    email: string;
  };
  value: {
    denomination: number;
  };
  delivery: {
    method: string;
    status: string;
  };
};

interface RewardsListProps {
  rewards: Reward[];
  refetchRewards: () => void;
}

export const RewardsList: FC<RewardsListProps> = ({
  rewards,
  refetchRewards,
}) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Recipient name</TableCell>
          <TableCell>Recipient email</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rewards.map((reward) => (
          <TableRow
            key={reward.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{reward.id}</TableCell>
            <TableCell>{formatDollars(reward.value.denomination)}</TableCell>
            <TableCell>{reward.recipient.name}</TableCell>
            <TableCell>{reward.recipient.email}</TableCell>
            <TableCell>{reward.delivery.method}</TableCell>
            <TableCell>{reward.delivery.status}</TableCell>
            <TableCell>
              {DateTime.fromISO(reward.created_at).toLocaleString(
                DateTime.DATETIME_FULL
              )}
            </TableCell>
            <TableCell>
              {reward.delivery.method === "EMAIL" &&
                reward.delivery.status !== "PENDING" && (
                  <Tooltip title="Resend Reward">
                    <IconButton
                      onClick={() =>
                        resendReward(reward.id).then(() => {
                          toast("Reward resent.", {
                            position: "top-right",
                            autoClose: 5000,
                          });
                        })
                      }
                    >
                      <ForwardToInboxIcon />
                    </IconButton>
                  </Tooltip>
                )}
              {reward.delivery.status === "PENDING" && (
                <Tooltip title="Approve Reward">
                  <IconButton
                    onClick={() => {
                      approveReward(reward.id).then(refetchRewards);
                      toast("Reward approved.", {
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
