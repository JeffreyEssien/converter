"use client"

import React, { useState, useEffect } from 'react';
import Btc from './btc/page';
import Eth from './eth/page';
import Usdt from './usdt/page';

export default function Home() {


  return (
    <div className='flex w-[80%] mx-auto items-center justify-around py-14'>
      <Usdt />
      {/* <Btc />
      <Eth /> */}
    </div>
  );
}
