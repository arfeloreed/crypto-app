import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./components/Coin";

function App() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&order=market_cap_desc&sparkline=false";
  const [cryptoList, setCryptoList] = useState([]);
  const [searchCoin, setSeacrhCoin] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCryptoList(res.data);
      })
      .catch((err) => {
        console.error("Can't fetch api data.", err);
      });
  }, []);

  const coins = cryptoList.filter((coin) => {
    return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Enter coin name..."
          onChange={(event) => setSeacrhCoin(event.target.value)}
        />
      </div>

      <div className="cryptoDisplay">
        {coins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.image}
              price={coin.current_price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
