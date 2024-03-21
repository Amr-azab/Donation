import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./updateD.module.css";
import instance from "../../instance";

interface DonationData {
  supporterName: string;
  campaign: string;
  frequency: string;
  designation?: string;
}

interface UpdateDonationProps {
  donationId: string; 
}

export const UpdateDonation: FC<UpdateDonationProps> = ({ donationId }) => {
  const navigate = useNavigate();
  const [supporter, setSupporter] = useState("");
  const [campaign, setCampaign] = useState("");
  const [designation, setDesignation] = useState("");
  const [frequency, setFrequency] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        setIsLoading(true);
        const res = await instance.get(`/user/getDonations/${donationId}`);
        const { data } = res.data.data.donation;
        setSupporter(data.supporterName);
        setCampaign(data.campaign);
        setDesignation(data.designation || "");
        setFrequency(data.frequency);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching donation:", error);
        setIsLoading(false);
      }
    };

    fetchDonation();
  }, [donationId]);

  const updateHandler = async () => {
    if (!campaign || !supporter || !frequency) {
      setIsError(true);
      setErrorMsg("Please provide all the fields!");
      return;
    }

    try {
      setIsLoading(true);
      const data: DonationData = {
        supporterName: supporter,
        campaign,
        designation,
        frequency,
      };
      const res = await instance.put(
        `/user/updateDonation/${donationId}`,
        data
      );
      if (res.data.status === "success") {
        setIsLoading(false);
        // navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error("Error updating donation:", err);
      setIsLoading(false);
      setIsError(true);
      setErrorMsg(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className={classes.donationContainer}>
      <div className={classes.header}>
        <h1 className={classes.title}>Update Donation</h1>
      </div>
      {isLoading && <div className={classes.loading}></div>}
      <div className={classes.inputs}>
        <input
          className={classes.email}
          type="text"
          placeholder="Supporter Name"
          value={supporter}
          onChange={(e) => setSupporter(e.target.value)}
        />
        <input
          className={classes.email}
          type="text"
          placeholder="Campaign"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
        />
        <input
          className={classes.email}
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <input
          className={classes.password}
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
      </div>
      {isError && <p className={classes.errorMsg}>{errorMsg}</p>}
      <div className={classes.buttons}>
        <button className={classes.signup} onClick={updateHandler}>
          Save
        </button>
      </div>
    </div>
  );
};
