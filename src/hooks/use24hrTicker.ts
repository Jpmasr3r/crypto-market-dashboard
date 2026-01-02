import { useEffect, useRef, useState } from "react";
import type { Binance24hrTicker, TickerSymbol } from "@/lib/types";
import { generateId } from "@/lib/utils";
import {
	defaultBinance24hrTicker,
	removeListener,
	socketSubscribe24h,
} from "@/lib/websocket";

export function use24hrTicker(symbol: TickerSymbol): Binance24hrTicker {
	const [data, setData] = useState<Binance24hrTicker>(defaultBinance24hrTicker);
	const idRef = useRef<string>(generateId());

	useEffect((): (() => void) => {
		socketSubscribe24h(symbol, { ref: setData, id: idRef.current });

		return (): void => {
			removeListener(symbol, idRef.current);
		};
	}, [symbol]);

	return data;
}
