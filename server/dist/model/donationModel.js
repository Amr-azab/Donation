"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const donationSchema = new mongoose_1.Schema({
    supporterID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    supporterName: {
        type: String,
        required: true,
    },
    campaign: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
    },
    donationDate: {
        type: Date,
        default: Date.now,
    },
    successDate: {
        type: Date,
        default: Date.now,
    },
    frequency: {
        type: String,
    },
    donationAmount: {
        type: Number,
        required: true,
    },
    beforeFeesCovered: {
        type: Number,
    },
    platformFee: {
        type: Number,
    },
    paymentProcessingFee: {
        type: Number,
    },
    payoutAmount: {
        type: Number,
    },
    paymentId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["credit card", "visa"],
        required: true,
    },
    paymentMethodNumber: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\d{8}$/.test(value); // Check if the value is exactly 8 digits
            },
            message: "Payment method number must be exactly 8 digits",
        },
    },
    effectiveFee: {
        type: Number,
    },
});
// Mongoose pre-save hook to modify paymentMethodNumber
donationSchema.pre("save", function (next) {
    // Ensure paymentMethodNumber is present and is a string
    if (this.paymentMethodNumber &&
        typeof this.paymentMethodNumber === "string") {
        // Replace the first four characters with dots
        this.paymentMethodNumber = "...." + this.paymentMethodNumber.slice(4);
    }
    next();
});
const DonationModel = mongoose_1.default.model("Donation", donationSchema);
exports.default = DonationModel;
