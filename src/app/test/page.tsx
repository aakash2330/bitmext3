"use client";
import { getFormattedDate } from "@/components/graph/Graph1";
import { use, useEffect, useState } from "react";

function calculateOHLC(trades: any) {
  if (!trades || trades.length === 0) {
    return null;
  }
  // Sort trades by timestamp to ensure correct order
  // @ts-ignore
  trades.sort((a:any, b:any) => new Date(a.timestamp) - new Date(b.timestamp));

  // Extract the prices from sorted trades
  const prices = trades.map((trade:any) => trade.price);

  // Calculate OHLC
  const open = prices[0]; // Open price is the first trade price
  const high = Math.max(...prices); // High price is the maximum price
  const low = Math.min(...prices); // Low price is the minimum price
  const close = prices[prices.length - 1]; // Close price is the last trade price
  return [(new Date(trades[0].timestamp).toLocaleTimeString()),open, high, low, close];
}

export default function useRefinedTradeWSdata() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messageRecieved, setMessageRecieved] = useState<number>(0);
  const [messageBucket, setMessageBucket] = useState<any>([]);
  const [refinedTradeData, setRefinedTradeData] = useState<any>([]);

  useEffect(() => {
    if (messageBucket) {
      if (messageBucket.length >= 5) {
        setMessageBucket([]);
        const refinedData = messageBucket.flatMap((m:any) => {
          if (m.data) return [m.data[0]];
          else return [];
        });
        setRefinedTradeData((m:any) => {
          return [...m, calculateOHLC(refinedData)];
        });
      }
    }
  }, [messageBucket]);

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://ws.bitmex.com/realtime?subscribe=trade:XBTUSD",
    );
    newSocket.onopen = () => {
      console.log("Connected");
    };
    newSocket.onmessage = (message) => {
      setMessageRecieved((c) => {
        return c + 1;
      });
      setMessageBucket((m: any) => {
        return [...m, JSON.parse(message.data)];
      });
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
return refinedTradeData;

}
