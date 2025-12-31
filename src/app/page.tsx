import type { JSX } from "react";
import CoinCard from "@/components/coinCard";
import CoinsChart from "@/components/coinsChart";
import "@/lib/websocket";

const gridMap: Record<number, string> = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
	5: "grid-cols-5",
};

export default function Home(): JSX.Element {
	const coins = ["btcusdt", "ethusdt", "bnbusdt", "bnbbrl"];
	const size = gridMap[coins.length] ?? "grid-cols-4";

	return (
		<div className="flex flex-row h-full w-full">
			<div className="w-full p-4 gap-4 flex flex-col">
				<div className={`grid grid-cols-1 ${size} gap-4 p-2`}>
					{coins.map((coin) => (
						<CoinCard key={coin} coin={coin} />
					))}
				</div>
				{coins.map((coin) => (
					<CoinsChart key={coin} symbol={coin} />
				))}
			</div>
		</div>
	);
}
