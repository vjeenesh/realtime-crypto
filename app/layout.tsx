"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { loadPricesFromLocalStorage } from "../redux/priceSlice";
import "./globals.css";
import { startPolling } from "../utils/poller";
import { GetServerSideProps } from "next";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  startPolling();
  return {
    props: {},
  };
};

export default RootLayout;
