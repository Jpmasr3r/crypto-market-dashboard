import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import type { Binance24hrTicker, ChartPoint } from "@/lib/types";
import { socketSubscribe24h } from "@/lib/websocket";

export function useTimeStamp(symbol: string, maxSize: number): ChartPoint[] {
	const [data, setData] = useState<ChartPoint[]>([]);

	useEffect((): (() => void) => {
		socketSubscribe24h(symbol, createTickerListener(setData, maxSize));

		// return () => {
		// 	removeListener(symbol, createTickerListener(setData));
		// };
		return () => {};
	}, [symbol, maxSize]);

	return data;
}

function getTimeStamp(
	prev: ChartPoint[],
	ticker: Binance24hrTicker,
	maxSize: number
): ChartPoint[] {
	const chartPoint: ChartPoint = {
		time: new Date().toLocaleTimeString(),
		price: Number(ticker.c),
		change: Number(ticker.v),
		volume: Number(ticker.p),
	};

	const size = Math.max(1, maxSize);
	const arrSliced = prev.slice(size * -1);
	return [...arrSliced, chartPoint];
}

function createTickerListener(
	setData: Dispatch<SetStateAction<ChartPoint[]>>,
	maxSize: number
): (ticker: Binance24hrTicker) => void {
	return (ticker: Binance24hrTicker) => {
		setData((prev) => {
			return getTimeStamp(prev, ticker, maxSize - 1);
		});
	};
}
