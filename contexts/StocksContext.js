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
  const [loginUser, setLoginUser] = useState();
  const ServerURL = "http://localhost:3000";

  // async function updateDatabase({ payload }) {
  //   const url = `${ServerURL}/users/watchlist`;
  //   console.log(payload);
  //   let res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: loginUser,
  //       newWatchlist: payload,
  //     }),
  //   });
  //   let data = await res.json();
  //   console.log(data);
  // }

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
        "watchlist",
        JSON.stringify([...oldState, newSymbol])
      );

      let payload = [...oldState, newSymbol];
      payload = JSON.stringify(payload);
      //console.log(payload);

      async () => {
        const url = `${ServerURL}/users/watchlist`;
        console.log(payload);
        let res = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginUser,
            newWatchlist: payload,
          }),
        });
        let data = await res.json();
        console.log(data);
      };
    } else {
      console.log("This symbol already in the watchlist");
      //notify users
    }
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
      if (value !== null) {
        let loginUserWatchlist = value.split(",");
        setState(loginUserWatchlist);
        //m.map((e) => console.log(e));
        //setState(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }

    try {
      const value = await AsyncStorage.getItem("loginuser");
      if (value !== null) {
        setLoginUser(value);
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
        ServerURL: "http://localhost:3000",
        watchList: state,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
