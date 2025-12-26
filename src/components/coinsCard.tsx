import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { JSX } from "react";
import { Card, CardContent } from "./ui/card";

type props = {
	data: {
		symbol: string;
		value: number;
		variation: number;
	}[];
};

export default function CoinsCard({ data }: props): JSX.Element {
	return (
		<div className="grid grid-cols-5 gap-4 p-2">
			{data.map((coin) => {
				const isPositive = coin.variation >= 0;
				const background = isPositive ? "bg-green/50" : "bg-red/50";
				const textColor = isPositive ? "text-green" : "text-red";

				return (
					<Card
						key={coin.symbol}
						className="bg-secondary border-0 text-white font-bold"
					>
						<CardContent>
							<h1 className="text-3xl italic">{coin.symbol}</h1>
							<p>R$ {coin.value.toFixed(6)}</p>
							<p
								className={`${background} ${textColor} font-extrabold flex items-center gap-2 w-fit px-3 py-1.5 rounded-full`}
							>
								{isPositive ? (
									<ArrowUpRight />
								) : (
									<ArrowDownRight />
								)}
								<span>{coin.variation}%</span>
							</p>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
