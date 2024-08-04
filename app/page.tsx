"use client";
import React, { useState } from "react";
import PricesTable from "./components/PricesTable";
import ChangeSymbolModal from "./components/ChangeSymbolModal";
import { useDispatch } from "react-redux";
import { loadPricesFromLocalStorage, setPrices } from "../redux/priceSlice";
import axios from "axios";
import { store } from "@/redux/store";
import { startPolling } from "@/utils/poller";
import { GetServerSideProps } from "next";
import RootLayout from "./layout";

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChangeSymbol = async (symbol: string) => {
    const response = await axios.get(`/api/prices/${symbol}`);
    dispatch(setPrices(response.data));
  };

  return (
    <RootLayout>
      <div>
        <h1>Welcome to Real-Time Price Tracker</h1>
        <button onClick={() => setModalOpen(true)}>Change Symbol</button>
        {isModalOpen && (
          <ChangeSymbolModal
            onChangeSymbol={handleChangeSymbol}
            onClose={() => setModalOpen(false)}
          />
        )}
        <PricesTable />
      </div>
    </RootLayout>
  );
};

export default Home;
