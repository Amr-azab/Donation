import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import classes from "./box.module.css";
import instance from "../../instance";
import { UpdateDonation } from "../updateDonation/updateD";

interface ModelBoxProps {
  donationId: string;
  open: boolean;
  handleClose: () => void;
}

const ModelBox: FC<ModelBoxProps> = ({ donationId, open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.box}>
          <UpdateDonation donationId={donationId} />
          <button onClick={handleClose}>Done</button>
        </div>
      </Modal>
    </>
  );
};

export default ModelBox;
