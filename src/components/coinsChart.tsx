import type { JSX } from "react";
import { PriceChart } from "./priceChart";

type props = {
	data: {
		symbol: string;
		value: number;
		variation: number;
	}[];
};

export default function CoinsChart({ data }: props): JSX.Element {
	return (
		<div className=" ">
			<PriceChart
				className="h-1/2 w-full p-2 gap-4 rounded-lg bg-secondary"
				config={{ price: { label: "value", color: "red" } }}
				data={data}
			/>
		</div>
	);
}
