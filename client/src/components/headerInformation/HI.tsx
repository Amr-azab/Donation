import React, { useState, useEffect } from "react";
import { FC } from "react";
import styles from "./HI.module.css";
import instance from "../../instance";

interface HeaderInformationProps {
  donationDate: string;
  supporterName: string;
  campaign: string;
  paymentMethod: string;
  paymentMethodNumber: string;
}

export const HeaderInformation: FC = () => {
  const [headerInformation, setHeaderInformation] =
    useState<HeaderInformationProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        const res = await instance.get(`user/getlastDonations`);
        const data = res.data.data.lastDonation;

        if (data) {
          setHeaderInformation(data);
        } else {
          setError("No donation data available");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchUserHandler();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!headerInformation) {
    return <div>No donation data available</div>;
  }
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
    <div className={styles.header}>
      <div className={styles.item}>
        <div className={styles.Up}>Last update</div>
        <div className={styles.Down}>
          {Time(headerInformation.donationDate)}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.Up}>Supporter Name</div>
        <div className={styles.Down}>{headerInformation.supporterName}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.Up}>Campaign</div>
        <div className={styles.Down}> {headerInformation.campaign}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.Up}>Payment Method</div>
        <div className={styles.Down}>{headerInformation.paymentMethod}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.Up}>Payment Method Number</div>
        <div className={styles.Down}>
          {" "}
          {headerInformation.paymentMethodNumber}
        </div>
      </div>
    </div>
  );
};
