import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = React.createContext();
export const useStocksContext = () => useContext(StocksContext);

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const oldState = state ?? [];
    setState((x) => {
      console.log(newSymbol);
      return [...x, newSymbol];
    });

    AsyncStorage.setItem(
      "@Watchlist",
      JSON.stringify([...oldState, newSymbol])
    );
  }

  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@Watchlist");
      if (value !== null) {
        setState(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  };

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    _retrieveData();
  }, []);

  return (
    <StocksContext.Provider
      value={{
        ServerURL: "http://131.181.190.87:3001",
        watchList: state,
        addToWatchlist,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
