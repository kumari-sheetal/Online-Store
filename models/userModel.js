import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    gender: {
      type: String, // Add the gender field
      enum: ["male", "female"], // Specify the allowed values for gender
      required: true,
    },
    // answer: {
    //   type: String,
    //   required: true,
    // },
    role: {
      type: Number,
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    verifytoken: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model("users", userSchema);
