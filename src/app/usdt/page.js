"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Usdt() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/8182794e41dde7fdc8f7d0f5/latest/USD');
        const data = response.data;
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleConvert = (event) => {
    event.preventDefault();
    if (data && data.conversion_rates) {
      const conversionRate = data.conversion_rates[selectedCurrency];
      const convertedAmount = amount * conversionRate + 12;
      setConvertedAmount(convertedAmount.toFixed(2));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">USD Converter</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : data ? (
        <>
          {/* Check for existence of conversion_rates object (optional) */}
          {data.conversion_rates && (
            <p className='text-center'>All conversion rates:</p>
          )}
          <ul>
            {/* Loop through conversion_rates object (if it exists) */}
            {data.conversion_rates &&
              Object.keys(data.conversion_rates).map((currency) => (
                <li key={currency}>
                  <p>
                    {/* {currency}: {data.conversion_rates[currency]} */}
                  </p>
                </li>
              ))}
          </ul>
          {/* Display other data from the response (if needed) */}
          {/* ... other data display logic ... */}
          <div className='xl:w-1/3 mt-10 mx-auto py-10 outline outline-green-600 px-4'>
          <form onSubmit={handleConvert} className='flex flex-col space-y-3'>
            <label htmlFor="amount">Enter USD amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              required
              className='text-black py-2 px-3 rounded-lg'
            />
            <label htmlFor="currency">Select currency to convert to:</label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              required
              className='text-black py-2 px-3 rounded-lg'
            >
              {Object.keys(data.conversion_rates).map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <button type="submit" className='xl:w-1/3 w-1/2 py-2 rounded-lg bg-green-600'>Convert</button>
          </form>
          {convertedAmount && (
            <p className='pt-4'>
              {amount} USD is equivalent to {convertedAmount} {selectedCurrency}
            </p>
          )}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}