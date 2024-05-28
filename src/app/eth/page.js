"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Eth() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  
    const handleClick = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,ETH,USDT,USD,NGN,EUR&extraParams=YOUR_APP_NAME');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // fetchData();
 


  return (
    <div className='w-full'>
        <button onClick={handleClick}>Get Crypto Prices</button>
     {loading ? (
        <p>Loading crypto prices...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : data ? (
        <ul className='text-center'>
          <li>
            <p className='text-xl text-green-500'>Cryptocurrency: Ethereum (ETH)</p>
          </li>
          <li>
            <p>Price in USDT (USDT): {data.USDT}</p>
          </li>
          <li>
            <p>Price in USD: {data.USD}</p>
          </li>
          <li>
            <p>Price in Naira: {data.NGN}</p>
          </li>
          <li>
            <p>Price in EUR: {data.EUR}</p>
          </li>
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}
