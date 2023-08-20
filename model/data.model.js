const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    price_upper: { type: Number, trim: true },
    price_lower: { type: Number, trim: true },
    data_date: { type: String, trim: true },
    data_time: { type: String, trim: true },
    open_price: { type: String, trim: true },
    opentime: { type: String, trim: true },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
