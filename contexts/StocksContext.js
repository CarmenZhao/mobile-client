import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = React.createContext();
export const useStocksContext = () => useContext(StocksContext);

export const StocksProvider = ({ children }) => {
  const ServerURL = "http://192.168.8.103:3000";
  const [state, setState] = useState([]);
  const [loginUser, setLoginUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const oldState = state ?? [];

    //check duplicates and save in useStockContext state
    if (!state.includes(newSymbol)) {
      setState((x) => {
        return [...x, newSymbol];
      });
    } else {
      console.log("This symbol already in the watchlist");
      //notify users
    }
  }

  async function UpdateDatabase(payload) {
    const url = `${ServerURL}/users/watchlist`;
    let user = "";
    try {
      const value = await AsyncStorage.getItem("loginuser");
      if (value !== null) {
        console.log(value);
        user = value;
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
    //console.log(loginUser);
    let a = JSON.stringify({
      email: user,
      newWatchlist: payload,
    });
    console.log(a);
    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        newWatchlist: payload,
      }),
    });
    let data = await res.json();
    console.log(data);
  }

  async function removeFromWatchlist(symbol) {
    let index = state.indexOf(symbol);
    // console.log(index);
    if (index !== -1) {
      let newState = [...state];
      newState.splice(index, 1);
      setState(newState);
    }
    //   const newState = state ?? [];
    //state.map((x) => console.log(x));
    //AsyncStorage.setItem("@Watchlist", JSON.stringify(newState));
    try {
      const value = await AsyncStorage.getItem("watchlist");
      if (value !== null) {
        let values = JSON.parse(value);
        let index = values.indexOf(symbol);
        if (index !== -1) {
          values.splice(index, 1);
          AsyncStorage.setItem("watchlist", JSON.stringify(values));
        }
        //values.map((e) => console.log(e));
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  }

  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("watchlist");
      console.log("check async in stockcontext");
      console.log(value);
      if(value!=null){
        let loginUserWatchlist = value.split(",");
        console.log(loginUserWatchlist);
        setState(loginUserWatchlist);
      }
      else{
        let temp=[];
        setState(temp)
      }
      
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  };

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    _retrieveData();
  }, [isLoggedIn]);

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    AsyncStorage.setItem("watchlist", state.toString());
    let payload = state;
    console.log(payload);
    payload = payload.toString();
    console.log("payload: " + payload);
    UpdateDatabase(payload);
  }, [state]);

  /*only for checking, can delete later*/
  async function getAsync() {
    try {
      const value = await AsyncStorage.getItem("loginuser");
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  }
  /*only for checking, can delete later*/

  return (
    <StocksContext.Provider
      value={{
        ServerURL: ServerURL,
        watchList: state,
        addToWatchlist,
        removeFromWatchlist,
        setIsLoggedIn,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
