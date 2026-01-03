import type { JSX } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
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
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Line
					type="monotone"
					dataKey="price"
					stroke="#44BB44"
					strokeWidth={3}
					dot={true}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
