"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { JSX } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Card, CardContent } from "./ui/card";

type prop = {
	coin: string;
};

export default function CoinCard({ coin }: prop): JSX.Element {
	const { data, connected } = useWebSocket(
		`wss://stream.binance.com:9443/ws/${coin}@ticker`
	);

	const isPositive = Number(data.P) >= 0;
	const background = isPositive ? "bg-green/50" : "bg-red/50";
	const textColor = isPositive ? "text-green" : "text-red";

	const symbol = data.s.replace("USDT", "");

	if (connected) {
		return (
			<Card
				key={data.s}
				className="bg-secondary border-0 text-white font-bold"
			>
				<CardContent>
					<h1 className="text-3xl italic">{symbol}</h1>
					<p>$ {Number(data.c).toFixed(6)}</p>
					<p
						className={`${background} ${textColor} font-extrabold flex items-center gap-2 w-fit px-3 py-1.5 rounded-full`}
					>
						{isPositive ? <ArrowUpRight /> : <ArrowDownRight />}
						<span>{Number(data.P).toFixed(2)}%</span>
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
