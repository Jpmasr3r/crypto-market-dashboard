"use client";

import { type JSX, useState } from "react";
import type { TickerSymbol } from "@/lib/types";
import { cryptoPairs } from "@/lib/utils";
import { PriceChart } from "./priceChart";
import SelectCoin from "./selectCoin";

export default function CoinsChart(): JSX.Element {
	const [symbol, setSymbol] = useState<TickerSymbol>(cryptoPairs[0]);

	return (
		<div className="flex flex-col h-2/3 w-full p-4 gap-4 m-2 text-white bg-secondary rounded-lg">
			<SelectCoin setSymbol={setSymbol} symbol={symbol} />
			<PriceChart symbol={symbol} />
		</div>
	);
}
