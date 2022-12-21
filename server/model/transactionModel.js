const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    price: {
      type: mongoose.Schema.Types.String,
      require: true,
    },
    bid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
      required: true,
    },
    approved: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
