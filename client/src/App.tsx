import React from "react";
import { useEffect, useState } from "react";
import classes from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { SignUp } from "./pages/signup/SignUP";
import { SignIn } from "./pages/signin/SignIn";
import { useUserIdStore } from "./store/userStorage";
import { Navigate } from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen/HS";
import { Layout } from "./pages/Layout/Layout";
import instance from "./instance";
import { LinearProgress } from "@mui/material";
import { Donation } from "./components/donation/donation";
import { DonationInformation } from "./pages/donationInformation/DI";
import { Footer } from "./components/footerInformation/FI";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserIdStore((state) => state.userProfile);
  const setUser = useUserIdStore((state) => state.setUser);

  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        setIsLoading(true);

        const res = await instance.get("/user/getMe");
        const data = res.data.data;
        setUser(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchUserHandler();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={classes.loading}>
          <LinearProgress color="inherit" />
        </div>
      ) : (
        <Routes>
          {!user._id ? (
            <>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          ) : null}

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/"
              index={true}
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:receiverId"
              element={
                <ProtectedRoute>
                  <Donation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/personinformation/:receiverId"
              element={
                <ProtectedRoute>
                  <DonationInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/payment&Fees/:receiverId"
              element={
                <ProtectedRoute>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
