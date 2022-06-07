import { useState, useEffect } from "react";
//const API_KEY = "f0bbfa7a7c6fb22ceba827daa52f8e26";
//const API_KEY = "5eb49566d020d9a874bb1c9ca820370a";
//const API_KEY = "5c0d174bc1907b622517580121861d96";
const API_KEY = "c00387c449baaad2b88dea5822bed61e";

//This function return the list of company name and symbol
//use in the search bar drop down
export function SstOptionData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);

  async function fetchInfo() {
    let res = await fetch(
      `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`
    );
    let data = await res.json();
    // console.log(data);
    return data.map((company) => {
      return {
        symbol: company.symbol,
        name: company.name,
      };
    });
  }

  useEffect(() => {
    (async () => {
      try {
        setRowData(await fetchInfo());
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);
  return { loading, rowData, error };
}
