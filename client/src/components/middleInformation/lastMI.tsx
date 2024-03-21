import React, { useState, useEffect } from "react";
import { FC } from "react";
import styles from "./MI.module.css";
import instance from "../../instance";
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

export const LastMiddle: FC = () => {
  const [lastDonation, setLastDonation] = useState<MiddleProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationId, setDonationId] = useState<string>("");

  useEffect(() => {
    const fetchLastDonation = async () => {
      try {
        const res = await instance.get(`user/getlastDonations`);
        const data = res.data.data.lastDonation;
        if (data) {
          setLastDonation(data);
          setDonationId(data?._id); // Set donationId if data is available
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

    fetchLastDonation();
  }, []);

  const handleEdit = () => {
    setIsModalOpen(true); // Open modal when edit button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!lastDonation) {
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
    <div className={styles.middle}>
      <h2 className={styles.DI}>Donation Information</h2>
      <div className={styles.row}>
        <span className={styles.left}>Donation Id</span>
        <span className={styles.right}>{lastDonation._id}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.left}>Supporter Name</span>
        <span className={styles.right}>{lastDonation.supporterName}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.left}>Campaign</span>
        <span className={styles.right}>{lastDonation.campaign}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.left}>Designation</span>
        <span className={styles.right}>{lastDonation.designation}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.left}>Donation Date </span>
        <span className={styles.right}>{Time(lastDonation.donationDate)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.left}>Success Date</span>
        <span className={styles.right}>{Time(lastDonation.successDate)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.left}>Frequency</span>
        <span className={styles.right}>{lastDonation.frequency}</span>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
        {isModalOpen && (
          <ModelBox
            donationId={donationId}
            open={isModalOpen}
            handleClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default LastMiddle;
