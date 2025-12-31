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

type props = {
	symbol: string;
	maxSize?: number;
};

export function PriceChart({ symbol, maxSize = 60 }: props): JSX.Element {
	const data: ChartPoint[] = useTimeStamp(symbol, maxSize);
	return (
		<ResponsiveContainer width="100%" height={350}>
			<AreaChart data={data}>
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="price"
					stackId="1"
					stroke="#bbbb44"
					fill="#eeee1150"
				/>
				<Area
					type="monotone"
					dataKey="volume"
					stackId="1"
					stroke="#44bbbb"
					fill="#11eeee50"
				/>
				<Area
					type="monotone"
					dataKey="change"
					stackId="1"
					stroke="#bb44bb"
					fill="#ee11ee50"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
