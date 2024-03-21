import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";

export interface IDonation extends Document {
  supporterID: IUser["_id"];
  supporterName: string;
  campaign: string;
  designation: string;
  donationDate: Date;
  successDate: Date;
  frequency: string;
  donationAmount: number;
  beforeFeesCovered: number;
  platformFee: number;
  paymentProcessingFee: number;
  payoutAmount: number;
  paymentId: string;
  paymentMethod: string;
  paymentMethodNumber: string;
  effectiveFee: number;
}

const donationSchema: Schema<IDonation> = new Schema({
  supporterID: {
    type: mongoose.Schema.Types.ObjectId,
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
      validator: function (value: string) {
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
donationSchema.pre<IDonation>("save", function (next) {
  // Ensure paymentMethodNumber is present and is a string
  if (
    this.paymentMethodNumber &&
    typeof this.paymentMethodNumber === "string"
  ) {
    // Replace the first four characters with dots
    this.paymentMethodNumber = "...." + this.paymentMethodNumber.slice(4);
  }
  next();
});

const DonationModel = mongoose.model<IDonation>("Donation", donationSchema);

export default DonationModel;
