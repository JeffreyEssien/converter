"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Btc() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  
    const handleClick = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,ETH,USD,NGN,EUR&extraParams=YOUR_APP_NAME');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

  


  return (
    <div className='w-full'>
        <button onClick={handleClick}>Get todays rates</button>
     {loading ? (
        <p>Loading crypto prices...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : data ? (
        <ul className='text-center'>
          <li>
            <p className='text-xl text-green-500'>Cryptocurrency: Bitcoin (BTC)</p>
          </li>
          <li>
            <p>Price in Ethereum (ETH): {data.ETH}</p>
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
