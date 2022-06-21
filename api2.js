import { useState, useEffect } from "react";

const API_KEY1 = "962935ACJCJMVRV3"; //100 days data
const API_KEY = "607f84ac4ebc39533caed82e8a001d02";
//const API_KEY = "5c0d174bc1907b622517580121861d96";
//const API_KEY = "5eb49566d020d9a874bb1c9ca820370a";
const API_KEY_SUS = "9bdf814120dd203b072c0828821bd0e2";

export function UseStockData(Symbol) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);

  //this function will fetch 100 days's open price of a company
  //for chart purpose
  async function fetchStockInfo() {
    let res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Symbol}&apikey=${API_KEY1}`
    );

    let data = await res.json();

    data = Object.entries(data)[1][1];

    let records = Object.entries(data);

    return records.map((company) => {
      return {
        date: company[0],
        open: company[1]["1. open"],
      };
    });
  }

  useEffect(() => {
    (async () => {
      try {
        setRowData(await fetchStockInfo(Symbol));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  return { loading, rowData, error };
}

//this function will get the details information of the company for bottom sheet info
export function GetStockDetails(Symbol) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compData, setCompData] = useState([]);

  async function fetchComInfo() {
    let res = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${Symbol}?apikey=${API_KEY}`
    );

    let company = await res.json();
    //console.log(company);

    return {
      name: company[0].name,
      price: company[0].price,
      change: company[0].change,
      open: company[0].open,
      dayLow: company[0].dayLow,
      dayHigh: company[0].dayHigh,
      eps: company[0].eps,
      volume: company[0].volume,
      mktCap: company[0].marketCap,
      changesPercentage: company[0].changesPercentage,
      exchange: company[0].exchange,
    };
  }
  useEffect(() => {
    (async () => {
      try {
        setCompData(await fetchComInfo());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  return { loading, compData, error };
}
