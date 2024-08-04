import axios from "axios";
import { connectToDatabase } from "./mongodb";
import Price from "../models/Price";

const API_URL = "https://api.livecoinwatch.com/coins/track";
const INTERVAL_MS = 10000;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LIVECOINWATCH_API_KEY}`,
};

async function fetchPrices(symbols: string[]) {
  try {
    const response = await axios.post(
      API_URL,
      { currency: "USD", codes: symbols, sort: "rank", order: "ascending" },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from LiveCoinWatch:", error);
    return [];
  }
}

export async function startPolling() {
  await connectToDatabase();

  const symbols = ["BTC", "ETH", "GOOGL", "AMZN", "AAPL"];

  setInterval(async () => {
    try {
      const data = await fetchPrices(symbols);
      const prices = data.map((item: any) => ({
        symbol: item.code,
        price: item.rate,
        timestamp: new Date(),
      }));

      await Price.insertMany(prices);
      console.log("Data inserted successfully");
    } catch (error) {
      console.error("Error during polling:", error);
    }
  }, INTERVAL_MS);
}
