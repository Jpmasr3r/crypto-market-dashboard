"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { JSX } from "react";
import { use24hrTicker } from "@/hooks/use24hrTicker";
import type { Binance24hrTicker } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

type prop = {
	coin: string;
};

export default function CoinCard({ coin }: prop): JSX.Element {
	const data: Binance24hrTicker = use24hrTicker(coin);

	const isPositive = Number(data.P) >= 0;
	const background = isPositive ? "bg-green/50" : "bg-red/50";
	const textColor = isPositive ? "text-green" : "text-red";

	if (data.s) {
		return (
			<Card
				key={data.s}
				className="bg-secondary border-0 text-white font-bold min-w-fit"
			>
				<CardContent>
					<h1 className="text-3xl italic">{data.s}</h1>
					<p>$ {Number(data.c).toFixed(6)}</p>
					<p
						className={`${background} ${textColor} text-nowrap flex flex-row font-extrabold items-center gap-2 w-fit px-3 py-1.5 rounded-full`}
					>
						{isPositive ? <ArrowUpRight /> : <ArrowDownRight />}
						<span>{Number(data.P).toFixed(2)}% 24h</span>
					</p>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<div>
				<Card className="bg-secondary border-0 text-white font-bold p-4">
					Connecting...
				</Card>
			</div>
		);
	}
}
