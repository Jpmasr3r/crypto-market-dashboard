import type { JSX } from "react";
import CoinsCard from "@/components/coinsCard";
import CoinsChart from "@/components/coinsChart";

export default function Home(): JSX.Element {
	const coins: {
		symbol: string;
		value: number;
		variation: number;
	}[] = [
		{ symbol: "ETH", value: 25, variation: 3 },
		{ symbol: "LTC", value: 150, variation: -2 },
		{ symbol: "BTC	", value: 100, variation: -5 },
		{ symbol: "XRP", value: 0.5, variation: 1 },
		{ symbol: "ADA", value: 1.2, variation: 4 },
	]; // Placeholder data

	return (
		<div className="flex flex-row h-full w-full">
			<div className="w-1/6 h-full bg-secondary rounded-br-2xl p-2 gap-4 text-white">
				<h1>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Earum sapiente placeat perspiciatis optio atque temporibus
					neque, tempora dolorum omnis, quia, asperiores voluptate
					quas officia assumenda quasi. Impedit id blanditiis
					recusandae.
				</h1>
			</div>
			<div className="w-5/6 h-full p-4 gap-4 flex flex-col">
				<CoinsCard data={coins} />
				<CoinsChart data={coins} />
			</div>
		</div>
	);
}
