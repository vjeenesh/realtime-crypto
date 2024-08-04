import mongoose, { Document, Model, Schema } from "mongoose";

interface PriceDocument extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

const priceSchema = new Schema<PriceDocument>({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Price: Model<PriceDocument> = mongoose.model("Price", priceSchema);
export default Price;
