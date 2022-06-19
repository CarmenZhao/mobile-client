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
      let temp = [...oldState, newSymbol];
      AsyncStorage.setItem("watchlist", temp.toString());
      UpdateDatabase(temp.toString());
    } else {
      console.log("This symbol already in the watchlist");
      //notify users
    }
  }

  async function UpdateDatabase(payload) {
    const url = `${ServerURL}/watchlist/update`;

    const token = await AsyncStorage.getItem("token");

    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
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
      AsyncStorage.setItem("watchlist", newState.toString());
      UpdateDatabase(newState.toString());
    }
  }

  async function _retrieveWatchlist(token) {
    const url = `${ServerURL}/watchlist/get`;
    try {
      let res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      console.log(data.message[0].watchlist);
      data = data.message[0].watchlist;
      if (data && data != null && data != "") {
        data = data.split(",");
        setState(data);
        AsyncStorage.setItem("watchlist", data.toString());
      } else {
        let temp = [];
        setState(temp);
      }
    } catch (error) {
      const value = await AsyncStorage.getItem("watchlist");
      console.log("check async in stockcontext");
      console.log(value);
      if (value != null) {
        let loginUserWatchlist = value.split(",");
        console.log(loginUserWatchlist);
        console.log("state: " + state);
        setState(loginUserWatchlist);
      }
    }
  }

  // let _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("watchlist");
  //     console.log("check async in stockcontext");
  //     console.log(value);
  //     if (value != null) {
  //       let loginUserWatchlist = value.split(",");
  //       console.log(loginUserWatchlist);
  //       console.log("state: " + state);
  //       setState(loginUserWatchlist);
  //     } else {
  //       console.log("state: " + state);
  //       let temp = [];
  //       setState(temp);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
  //   }
  // };

  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log("check token");
      console.log(value);
      if (value != null) {
        _retrieveWatchlist(value);
      } else {
        let temp = [];
        setState(temp);
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  };

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    console.log(isLoggedIn);
    _retrieveData();
  }, [isLoggedIn]);

  let _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log("check token");
      console.log(value);
      if (value == null) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  };

  useEffect(() => {
    // try {
    //   const value = AsyncStorage.getItem("token");
    //   console.log("check token");
    //   console.log(value);
    //   if (value != null) {
    //     setIsLoggedIn(true);
    //   } else {
    //     setIsLoggedIn(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    // }
    _retrieveToken();
  }, []);

  return (
    <StocksContext.Provider
      value={{
        ServerURL: ServerURL,
        watchList: state,
        addToWatchlist,
        removeFromWatchlist,
        setIsLoggedIn,
        isLoggedIn: isLoggedIn,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
