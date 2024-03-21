import express from "express";
import {
  login,
  protect,
  signup,
  logout,
  getMe,
} from "../controllers/userController";
import {
  getDonation,
  getDonationById,
  updateDonationById,
  deleteDonationById,
  createDonation,
  getLastDonation,
} from "../controllers/donationController";
export const router = express.Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getMe").get(protect, getMe);
router.route("/logout").post(protect, logout);
router.route("/getDonations").get(protect, getDonation);
router.route("/getDonations/:DonationId").get(protect, getDonationById);
router.route("/createDonation").post(protect, createDonation);

router.route("/updateDonation/:DonationId").put(protect, updateDonationById);
router.route("/deleteDonation/:DonationId").delete(protect, deleteDonationById);
router.route("/getlastDonations").get(protect, getLastDonation);
