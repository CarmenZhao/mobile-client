import { useState, useEffect } from "react";

export function GetNews(symbol) {
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);
  const [newsData, setnewsData] = useState([]);
  // const API_KEY = "a9vcrWT6K0jolxHYmLpfwF8kH6UpmDWC92hlbQmh";
  const API_KEY = "Fkv6J1iTVnOq1IvFaiEp0jVTpnOSqfitH0wRnE1h";
  async function fetchInfo() {
    let res = await fetch(
      `https://api.marketaux.com/v1/news/all?symbols=${symbol}&filter_entities=true&language=en&api_token=${API_KEY}`
    );
    let news = await res.json();
    console.log(news);
    news = news.data;
    console.log(news);
    return news.map((e) => {
      return {
        title: e.title,
        description: e.description,
        url: e.url,
        img: e.image_url,
        time: e.published_at,
      };
    });
  }

  useEffect(() => {
    (async () => {
      try {
        let temp = await fetchInfo();
        console.log(temp);
        setnewsData(temp);
        setLoading3(false);
      } catch (err) {
        setError3(err);
      }
    })();
  }, []);

  return { loading3, newsData, error3 };
}
