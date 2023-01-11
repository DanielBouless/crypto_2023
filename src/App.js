import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from 'react';



function App() {

  const [ coinName, setCoinName ] = useState('ethereum')
  const [ coinInfo, setCoinInfo] = useState({id:'ethereum'})
  const [ coinHistInfo, setCoinHistInfo ] = useState([])

  const updateFields = (event) =>{
    event.preventDefault()
    setCoinInfo({...coinInfo, id: coinName})
  }

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinInfo.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setCoinInfo(data);
  };
  fetchData();

  const fetchHistoricalData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=max&interval=hourly`
    );

    const data = await response.json();
    console.log(data.prices);
    setCoinHistInfo([data.prices])
    console.log(coinHistInfo)
  };
  fetchHistoricalData();
}, [coinInfo.id]);


const display = coinInfo.market_data ? (
  <>
    <Card>
      <Card.Title> {coinInfo.name}</Card.Title>
      <Card.Body>
        Coin current price: {coinInfo.market_data.current_price.usd}
      </Card.Body>
    </Card>
    <Card>
      <form onSubmit={updateFields}>
        <label>
          Search Coin by Name:{" "}
          <input
            type="text"
            value={coinName}
            onChange={(event) => {
              setCoinName(event.target.value);
            }}
          />
        </label>
        <button type="submit" title="submit">
          Search
        </button>
      </form>
    </Card>
  </>
) : (
  (<>
    <Card>
      <Card.Title> SEARCH FOR COIN </Card.Title>
      <Card.Body>
        Coin current price: SEARCH FOR COIN
      </Card.Body>
    </Card>
    <Card>
      <form onSubmit={updateFields}>
        <label>
          Search Coin by Name:{" "}
          <input
            type="text"
            value={coinName}
            onChange={(event) => {
              setCoinName(event.target.value);
            }}
          />
        </label>
        <button type="submit" title="submit">
          Search
        </button>
      </form>
    </Card>
  </>
  )
);

  return (
    <>
{display}
    </>
  );
}

export default App;
