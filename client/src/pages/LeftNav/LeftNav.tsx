import { FC } from "react";
import classes from "./LeftNav.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import instance from "../../instance";
import { useUserIdStore } from "../../store/userStorage";

export const LeftNav: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserIdStore((state) => state.userProfile);
  const setUser = useUserIdStore((state) => state.setUser);
  const logOutHandler = async () => {
    const res = await instance.post("/user/logout");
    if (res.data.status === "success") {
      setUser("");
      navigate("/signIn", { replace: true });
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>Donation</div>
      <div className={classes.links}>
        <div>
          <Link to={`/user/${user._id}`} className={classes.customLink}>
            Donation
          </Link>
        </div>
        <Link
          to={`/user/payment&Fees/${user._id}`}
          className={classes.customLink}
        >
          <div>Payment & Fees</div>
        </Link>

        <Link
          to={`/user/personinformation/${user._id}`}
          className={classes.customLink}
        >
          <div>Personal Information</div>
        </Link>

        <div>Tribute</div>
        <div>Comment</div>
        <div>Source</div>
        <div>Custom fields</div>
        <div>email</div>
        <div>Transactions</div>
        <div>Double the Donation</div>
        <div>
          <Link
            to="/logout"
            className={classes.customLink}
            onClick={logOutHandler}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};
