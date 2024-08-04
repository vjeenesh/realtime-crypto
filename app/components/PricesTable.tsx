"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrices } from "@/redux/priceSlice";
import axios from "axios";

const PricesTable: React.FC = () => {
  const dispatch = useDispatch();
  const prices = useSelector((state: any) => state.prices.prices);

  const fetchPrices = async (symbol: string) => {
    const response = await axios.get(`/api/prices/${symbol}`);
    dispatch(setPrices(response.data));
  };

  useEffect(() => {
    fetchPrices("BTC");
    const interval = setInterval(() => fetchPrices("BTC-USD"), 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <h2>Real-Time Price Data</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price: any) => (
            <tr key={price._id}>
              <td>{price.symbol}</td>
              <td>${price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricesTable;
