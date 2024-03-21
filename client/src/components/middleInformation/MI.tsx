// Middle.tsx
import React, { useState, useEffect } from "react";
import { FC } from "react";
import styles from "./MI.module.css";
import instance from "../../instance";
import { useUserIdStore } from "../../store/userStorage";
import ModelBox from "../Box/box";

export interface MiddleProps {
  _id: string;
  supporterName: string;
  campaign: string;
  designation: string;
  donationDate: string;
  successDate: string;
  frequency: string;
}

export const Middle: FC = () => {
  const [middle, setMiddle] = useState<MiddleProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const user = useUserIdStore((state) => state.userProfile);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        if (user && user._id) {
          const res = await instance.get(`user/getDonations`);
          const data = res.data.data.donation;
          setMiddle(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserHandler();
  }, [user]);

  const Time = (thetime: string): string => {
    const date = new Date(thetime);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const result = `${month}-${day}, ${hours}:${minutes} ${ampm}`;
    return result;
  };

  return (
    <>
      {middle.map((item) => (
        <div key={item._id} className={styles.middle}>
          <h2>Donation Information</h2>
          <div className={styles.row}>
            <span>Donation Id</span>
            <span>{item._id}</span>
          </div>
          <div className={styles.row}>
            <span>Supporter</span>
            <span>{item.supporterName}</span>
          </div>
          <div className={styles.row}>
            <span>Campaign</span>
            <span>{item.campaign}</span>
          </div>
          <div className={styles.row}>
            <span>Designation</span>
            <span>{item.designation}</span>
          </div>
          <div className={styles.row}>
            <span>Donation Date</span>
            <span>{Time(item.donationDate)}</span>
          </div>
          <div className={styles.row}>
            <span>Success Date</span>
            <span>{Time(item.successDate)}</span>
          </div>
          <div className={styles.row}>
            <span>Frequency</span>
            <span>{item.frequency}</span>
          </div>
          <button className={styles.editButton} onClick={handleOpen}>
            Edit
          </button>
          {/* <ModelBox open={open} handleClose={handleClose} /> */}
        </div>
      ))}
    </>
  );
};
