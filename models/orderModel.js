import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    cart: {
      type: Array,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "COD"],
      default: "PAID",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
