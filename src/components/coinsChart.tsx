import type { JSX } from "react";
import type { TickerSymbol } from "@/lib/types";
import { PriceChart } from "./priceChart";

type props = {
	symbol: TickerSymbol;
};

export default function CoinsChart({ symbol }: props): JSX.Element {
	return (
		<div className="flex flex-col h-2/3 w-full gap-4 p-4 text-white bg-secondary rounded-lg">
			<PriceChart symbol={symbol} maxSize={100} />
		</div>
	);
}
