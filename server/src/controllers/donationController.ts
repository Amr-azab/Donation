import { RequestHandler } from "express";
import { CustomRequest } from "../interfaces/customRequest";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import DonationModel, { IDonation } from "../model/donationModel";


export const createDonation: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const {
      supporterName,
      campaign,
      designation,
      frequency,
      paymentId,
      paymentMethod,
      donationAmount,
      paymentMethodNumber,
    } = req.body;

    const newDomnation: IDonation = await DonationModel.create({
      supporterID: req.user?._id,
      supporterName,
      campaign,
      designation,
      frequency,
      paymentId,
      paymentMethod,
      donationAmount,
      paymentMethodNumber,
    });

    res.status(201).json({
      status: "success",
      data: {
        donation: newDomnation,
      },
    });
  }
);

export const getDonation: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const donation = await DonationModel.find({
      supporterID: req.user?._id,
    })
      .sort({ donationDate: -1 })
      .populate("supporterID", "campaign");

    res.status(200).json({
      status: "success",
      data: {
        donation,
      },
    });
  }
);
export const getLastDonation: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    // Fetch the last donation made by the currently logged-in user
    const lastDonation = await DonationModel.findOne({
      supporterID: req.user?._id,
    })
      .sort({ donationDate: -1 }) // Sort by donationDate in descending order
      .limit(1) // Limit the result to one donation
      .populate("supporterID", "supporterName"); // Populate supporterName field

    res.status(200).json({
      status: "success",
      data: {
        lastDonation,
      },
    });
  }
);

export const getDonationById: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const DonationId = req.params.DonationId;
    

    const donation = await DonationModel.findById(DonationId).populate(
      "supporterID",
      "campaign"
    );

    if (!donation) {
      return next(new AppError("Announcement not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        donation,
      },
    });
  }
);
export const updateDonationById: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const { supporterName, campaign, designation, frequency } = req.body;
    const DonationId = req.params.DonationId;

    const existingDonation = await DonationModel.findById(DonationId).populate(
      "supporterID",
      "campaign"
    );

    if (!existingDonation) {
      return next(new AppError("Donation not found", 404));
    }
    const updateDonation = await DonationModel.findByIdAndUpdate(
      DonationId,
      { supporterName, campaign, designation, frequency },
      { new: true, runValidators: true }
    ).populate("supporterID", "campaign");

    res.status(200).json({
      status: "success",
      data: {
        updateDonation,
      },
    });
  }
);
export const deleteDonationById: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const DonationId = req.params.DonationId;

    const existingDonation = await DonationModel.findById(DonationId);

    if (!existingDonation) {
      return next(new AppError("Announcement not found", 404));
    }
    const deleteDonation = await DonationModel.findByIdAndDelete(DonationId);

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
