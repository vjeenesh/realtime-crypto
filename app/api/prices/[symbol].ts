import { NextApiRequest, NextApiResponse } from "next";
import Price from "../../../models/Price";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  await connectToDatabase();

  const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(prices);
}
