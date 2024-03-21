import React, { useState, useEffect } from "react";
import { FC } from "react";
import styles from "./FI.module.css";
import instance from "../../instance";
import { useUserIdStore } from "../../store/userStorage";

interface DonationDetails {
  _id: string;
  donationAmount: number;
  paymentId: string;
  donationDate: string;
  paymentMethod: string;
  paymentMethodNumber: string;
}

export const Footer: FC = () => {
  const [footer, setFooter] = useState<DonationDetails[]>([]);
  const user = useUserIdStore((state) => state.userProfile);

  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        if (user && user._id) {
          const res = await instance.get(`user/getDonations`);
          const data = res.data.data.donation;
          setFooter(data);
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
      {footer.map((item) => (
        <div key={item._id} className={styles.footer}>
          <h2 className={styles.title}>Payment & fees</h2>
          <div className={styles.grid}>
            <div>
              <div className={styles.row}>
                <span className={styles.data}>Donation Amount</span>
                <span className={styles.data}>${item.donationAmount} USD</span>
              </div>
              <div className={styles.row}>
                <span className={styles.data}>Payment ID</span>
                <span className={styles.data}>{item.paymentId}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.data}>Payment Method</span>
                <span className={styles.data}>{item.paymentMethod}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.data}>Payment Method Number</span>
                <span className={styles.data}>{item.paymentMethodNumber}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.data}>The Time</span>
                <span className={styles.data}>{Time(item.donationDate)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
