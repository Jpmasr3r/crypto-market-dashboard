import {
	type Dispatch,
	type RefObject,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import type { Binance24hrTicker, ChartPoint } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { removeListener, socketSubscribe24h } from "@/lib/websocket";

export function useTimeStamp(symbol: string, maxSize: number): ChartPoint[] {
	const [data, setData] = useState<ChartPoint[]>([]);

	const maxSizeRef = useRef<number>(maxSize);
	useEffect(() => {
		maxSizeRef.current = maxSize;
	}, [maxSize]);

	const listenerRef = useRef<((ticker: Binance24hrTicker) => void) | null>(null);
	const idRef = useRef<string>(generateId());

	useEffect(() => {
		setData([]);
		removeListener(symbol, idRef.current);

		const newListener = createTickerListener(setData, maxSizeRef);
		listenerRef.current = newListener;

		socketSubscribe24h(symbol, { ref: newListener, id: idRef.current });

		return () => {
			if (listenerRef.current) removeListener(symbol, idRef.current);
		};
	}, [symbol]);

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
		symbol: ticker.s,
	};

	const size = Math.max(1, maxSize);
	const arrSliced = prev.slice(size * -1);
	return [...arrSliced, chartPoint];
}

function createTickerListener(
	setData: Dispatch<SetStateAction<ChartPoint[]>>,
	maxSizeRef: RefObject<number>
): (ticker: Binance24hrTicker) => void {
	return (ticker: Binance24hrTicker) => {
		setData((prev) => getTimeStamp(prev, ticker, maxSizeRef.current));
	};
}
