"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDonationById = exports.updateDonationById = exports.getDonationById = exports.getLastDonation = exports.getDonation = exports.createDonation = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const donationModel_1 = __importDefault(require("../model/donationModel"));
exports.createDonation = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const { supporterName, campaign, designation, frequency, paymentId, paymentMethod, donationAmount, paymentMethodNumber, } = req.body;
    const newDomnation = await donationModel_1.default.create({
        supporterID: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
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
});
exports.getDonation = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const donation = await donationModel_1.default.find({
        supporterID: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
    })
        .sort({ donationDate: -1 })
        .populate("supporterID", "campaign");
    res.status(200).json({
        status: "success",
        data: {
            donation,
        },
    });
});
exports.getLastDonation = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    // Fetch the last donation made by the currently logged-in user
    const lastDonation = await donationModel_1.default.findOne({
        supporterID: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
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
});
exports.getDonationById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const DonationId = req.params.DonationId;
    const donation = await donationModel_1.default.findById(DonationId).populate("supporterID", "campaign");
    if (!donation) {
        return next(new appError_1.AppError("Announcement not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            donation,
        },
    });
});
exports.updateDonationById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { supporterName, campaign, designation, frequency } = req.body;
    const DonationId = req.params.DonationId;
    const existingDonation = await donationModel_1.default.findById(DonationId).populate("supporterID", "campaign");
    if (!existingDonation) {
        return next(new appError_1.AppError("Donation not found", 404));
    }
    const updateDonation = await donationModel_1.default.findByIdAndUpdate(DonationId, { supporterName, campaign, designation, frequency }, { new: true, runValidators: true }).populate("supporterID", "campaign");
    res.status(200).json({
        status: "success",
        data: {
            updateDonation,
        },
    });
});
exports.deleteDonationById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const DonationId = req.params.DonationId;
    const existingDonation = await donationModel_1.default.findById(DonationId);
    if (!existingDonation) {
        return next(new appError_1.AppError("Announcement not found", 404));
    }
    const deleteDonation = await donationModel_1.default.findByIdAndDelete(DonationId);
    res.status(200).json({
        status: "success",
        data: null,
    });
});
