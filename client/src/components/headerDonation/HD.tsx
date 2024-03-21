import React, { useState, useEffect } from "react";
import { FC } from "react";
import styles from "./HD.module.css";
import instance from "../../instance";

interface HeaderProps {
  donationAmount: string;
}

export const Header: FC = () => {
  const [header, setHeader] = useState<HeaderProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("user/getlastDonations");
        const data = res.data.data.lastDonation;

        if (data) {
          setHeader(data);
        } else {
          setError("No donation data available");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!header) {
    return <div>No donation data available</div>;
  }

  // const handleRefund = async () => {
  //   try {
  //     // Add logic for refund functionality here
  //   } catch (error) {
  //     console.log("Error occurred while processing refund:", error);
  //   }
  // };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Donation</h1>
      <div className={styles.donation}>
        <span className={styles.amount}>${header.donationAmount} USD</span>
        <span className={styles.status}>succeeded</span>
        <button className={styles.refundButton}>Refund</button>
      </div>
    </div>
  );
};
