// import React, { useState, useContext, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const StocksContext = React.createContext();
// export const useStocksContext = () => useContext(StocksContext);

// export const StocksProvider = ({ children }) => {
//   const [state, setState] = useState([]);

//   function addToWatchlist(newSymbol) {
//     //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
//     const oldState = state ?? [];

//     // setState((x) => {
//     //   console.log(newSymbol);
//     //   return [...x, newSymbol];
//     // });
//     if (!state.includes(newSymbol)) {
//       setState((x) => {
//         console.log(newSymbol);
//         return [...x, newSymbol];
//       });

//       AsyncStorage.setItem(
//         "@Watchlist",
//         JSON.stringify([...oldState, newSymbol])
//       );
//     } else {
//       console.log("This symbol already in the watchlist");
//       //notify users
//     }
//   }

//   function removeFromWatchlist(symbol) {
//     // let index = state.indexOf(symbol);
//     // console.log(index);
//     // if (index !== -1) {
//     //   setState(() => state.splice(index, 1));
//     //   const newState = state ?? [];
//     //   AsyncStorage.setItem("@Watchlist", JSON.stringify(newState));
//     // }
//   }

//   let _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("@Watchlist");
//       if (value !== null) {
//         setState(JSON.parse(value));
//       }
//     } catch (error) {
//       console.log(error);
//       // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
//     }
//   };

//   useEffect(() => {
//     // FixMe: Retrieve watchlist from persistent storage
//     _retrieveData();
//   }, []);

//   return (
//     <StocksContext.Provider
//       value={{
//         ServerURL: "http://131.181.190.87:3001",
//         watchList: state,
//         addToWatchlist,
//         removeFromWatchlist,
//       }}
//     >
//       {children}
//     </StocksContext.Provider>
//   );
// };

import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = React.createContext();
export const useStocksContext = () => useContext(StocksContext);

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const oldState = state ?? [];

    // setState((x) => {
    //   console.log(newSymbol);
    //   return [...x, newSymbol];
    // });
    if (!state.includes(newSymbol)) {
      setState((x) => {
        //console.log(newSymbol);
        return [...x, newSymbol];
      });

      AsyncStorage.setItem(
        "@Watchlist",
        JSON.stringify([...oldState, newSymbol])
      );
    } else {
      console.log("This symbol already in the watchlist");
      //notify users
    }
  }

  async function removeFromWatchlist(symbol) {
    let index = state.indexOf(symbol);
    // console.log(index);
    if (index !== -1) {
      let newState = state;
      newState.splice(index, 1);
      setState(newState);
    }
    //   const newState = state ?? [];
    //state.map((x) => console.log(x));
    //AsyncStorage.setItem("@Watchlist", JSON.stringify(newState));
    try {
      const value = await AsyncStorage.getItem("@Watchlist");
      if (value !== null) {
        let values = JSON.parse(value);
        let index = values.indexOf(symbol);
        if (index !== -1) {
          values.splice(index, 1);
          AsyncStorage.setItem("@Watchlist", JSON.stringify(values));
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
        removeFromWatchlist,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
