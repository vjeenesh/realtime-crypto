// redux/priceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
}

interface PriceState {
  prices: PriceData[];
}

const initialState: PriceState = {
  prices: [],
};

const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<PriceData[]>) => {
      state.prices = action.payload;
      localStorage.setItem("prices", JSON.stringify(action.payload));
    },
    loadPricesFromLocalStorage: (state) => {
      const storedPrices = localStorage.getItem("prices");
      if (storedPrices) {
        state.prices = JSON.parse(storedPrices);
      }
    },
  },
});

export const { setPrices, loadPricesFromLocalStorage } = priceSlice.actions;
export default priceSlice.reducer;
