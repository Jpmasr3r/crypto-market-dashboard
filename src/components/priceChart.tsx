"use client";

import type { HTMLAttributes, JSX } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type chartConfig = {
	price: {
		label: string;
		color: string;
	};
};

type ChartData = {
	symbol: string;
	value: number;
	variation: number;
}[];

type PriceChartProps = {
	data: ChartData;
	config: chartConfig;
} & HTMLAttributes<HTMLDivElement>;

export function PriceChart({
	data,
	config,
	className,
}: PriceChartProps): JSX.Element {
	return (
		<ChartContainer config={config} className={className}>
			<LineChart data={data}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="symbol" />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Line
					dataKey="value"
					type="monotone"
					stroke="green"
					strokeWidth={2}
					dot={true}
				/>
				<Line
					dataKey="variation"
					type="monotone"
					stroke="pink"
					strokeWidth={4}
					dot={true}
				/>
			</LineChart>
		</ChartContainer>
	);
}
