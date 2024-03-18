'use client'

import { useState, useEffect } from 'react'
import Image from "next/image";
import React from "react";
import {Button} from "@nextui-org/react";

export default function Home() {
  const [data, setData] = useState('')
  const [isLoading, setLoading] = useState(true)

  const submitClick = async() => {
    const req = await fetch('/api/clickme',  {
            method: 'POST'
    });
    const clicksData = await req.json();

    setLoading(false)
    return setData(clicksData)
  }

  const handleClick = () => {
    console.log('clicked');
    submitClick();
  };

  useEffect(() => {
    fetch('/api/clickme')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Hello world! Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
	<p>
          <Button color="primary" onClick={handleClick}>
           Button
          </Button>
        </p>
	<p>
	  Count: {data.clicks}
	</p>
      </div>
    </main>
  );
}
