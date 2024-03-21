import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../instance";
import classes from "./donation.module.css";
import { useUserIdStore } from "../../store/userStorage";

export interface SignUpProps {}

export const Donation: FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const [supporterName, setsupporter] = useState("");
  const [campaign, setCampaign] = useState("");
  const [designation, setDesignation] = useState("");
  const [paymentId, setpaymenID] = useState("");
  const [frequency, setfrequency] = useState("");
  const [donationAmount, setdonationAmount] = useState("");
  const [paymentMethodNumber, setpaymentMethodNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("credit card");
  const [successMessage, setSuccessMessage] = useState("");

  const setUpdateUsers = useUserIdStore((state) => state.setUpdateUsers);

  let data = {
    supporterName: "",
    campaign: "",
    designation: "",
    paymentId: "",
    paymentMethod: "credit card",
    paymentMethodNumber: "",
    frequency: "",
    donationAmount: "",
  };

  const setUser = useUserIdStore((state) => state.setUser);

  const supporterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setsupporter(e.target.value);
  };
  const frequencyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setfrequency(e.target.value);
  };
  const donationAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setdonationAmount(e.target.value);
  };
  const campaignHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setCampaign(e.target.value);
  };
  const DesignationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setDesignation(e.target.value);
  };
  const paymenIDHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setpaymenID(e.target.value);
  };
  const paymentMethodNumberHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsError(false);
    setpaymentMethodNumber(e.target.value);
  };

  const paymentMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setpaymentMethod(e.target.value);
    data.paymentMethod = e.target.value; 
  };

  const donateHandler = async () => {
    if (
      !campaign ||
      !supporterName ||
      !paymentId ||
      !paymentMethod ||
      !paymentMethodNumber ||
      !donationAmount ||
      !designation
    ) {
      setIsError(true);
      setUpdateUsers();
      setErrorMsg("Please provide all the fields !");
      return;
    }

    // Validate payment method number
    const paymentMethodNumberPattern = /^\d{8}$/;
    if (!paymentMethodNumberPattern.test(paymentMethodNumber)) {
      setIsError(true);
      setErrorMsg("Payment method number must be exactly 8 digits");
      return;
    }

    // Validate donation amount
    const donationAmountNumber = parseFloat(donationAmount);
    if (isNaN(donationAmountNumber) || donationAmountNumber <= 0) {
      setIsError(true);
      setErrorMsg("Donation amount must be a positive number");
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        supporterName,
        campaign,
        designation,
        paymentId,
        paymentMethod,
        paymentMethodNumber,
        frequency,
        donationAmount,
      };

      const res = await instance.post("user/createDonation", data);

      if (res.data.status === "success") {
        setIsLoading(false);
        setSuccessMessage("Donation successfully made ✔");
        const { user } = res.data.data || {};
        if (user) {
          setUpdateUsers();
          setUser(user);
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      setIsError(true);
      setErrorMsg(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.word}> Donation </h1>
      </div>
      {isLoading && <div className={classes.loading}></div>}
      <div className={classes.inputs}>
        <input
          className={classes.email}
          type="text"
          placeholder="Supporter name"
          onChange={supporterHandler}
        />
        <input
          className={classes.email}
          type="text"
          placeholder="Campaign"
          onChange={campaignHandler}
        />
        <input
          className={classes.email}
          type="text"
          placeholder="Designation"
          onChange={DesignationHandler}
        />
        <select
          className={`${classes.roleSelect} ${classes.email}`}
          onChange={paymentMethodHandler}
        >
          <option value="credit card">credit card</option>
          <option value="visa">visa</option>
        </select>
        <input
          className={classes.password}
          type="text"
          placeholder="Paymen ID"
          onChange={paymenIDHandler}
        />
        <input
          className={classes.password}
          type="text"
          placeholder="payment Method Number"
          onChange={paymentMethodNumberHandler}
        />
        <input
          className={classes.password}
          type="text"
          placeholder="Donation Amount"
          onChange={donationAmountHandler}
        />
        <input
          className={classes.password}
          type="text"
          placeholder="Frequency"
          onChange={frequencyHandler}
        />
      </div>
      {isError && <p className={classes.errorMsg}>{errorMsg}</p>}
      {successMessage && <p className={classes.successMsg}>{successMessage}</p>}
      <div className={classes.buttons}>
        <button className={classes.signup} onClick={donateHandler}>
          Donate
        </button>
      </div>
    </div>
  );
};
