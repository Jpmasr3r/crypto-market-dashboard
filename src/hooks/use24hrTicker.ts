import { useEffect, useState } from "react";
import type { Binance24hrTicker, TickerSymbol } from "@/lib/types";
import { defaultBinance24hrTicker, socketSubscribe24h } from "@/lib/websocket";

export function use24hrTicker(symbol: TickerSymbol): Binance24hrTicker {
	const [data, setData] = useState<Binance24hrTicker>(defaultBinance24hrTicker);

	useEffect((): (() => void) => {
		socketSubscribe24h(symbol, setData);

		// return (): void => {
		// 	removeListener(symbol, setData);
		// };
		return () => {};
	}, [symbol]);

	return data;
}
