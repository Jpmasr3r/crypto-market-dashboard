"use client";

import type { JSX } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useTimeStamp } from "@/hooks/useTimeStamp";
import type { ChartPoint } from "@/lib/types";
import AnimatedText from "./animatedText";

type props = {
	symbol: string;
	maxSize?: number;
};

export function PriceChart({ symbol, maxSize = 10 }: props): JSX.Element {
	const data: ChartPoint[] = useTimeStamp(symbol, maxSize);

	if (data.length === 0) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<AnimatedText
					frames={[
						"Connecting",
						"Connecting.",
						"Connecting..",
						"Connecting...",
					]}
					speed={250}
					className="text-4xl"
				/>
			</div>
		);
	}
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart data={data}>
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="price"
					stackId="1"
					stroke="#44BB44"
					strokeWidth={3}
					fill="#44BB4444"
				/>
				<Area
					type="monotone"
					dataKey="symbol"
					stackId="1"
					stroke="#44BB44"
					strokeWidth={3}
					fill="#44BB4444"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
