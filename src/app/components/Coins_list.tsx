import type { JSX } from "react";
import Coin from "./Coin";

export default function Coins_list(): JSX.Element {
	return (
		<div className="flex flex-1 m-0.5 w-4/6 h-1/4">
			<Coin
				coin_name="BTC"
				coin_price={500}
				coin_variation={{ time: "24h", variation: 10 }}
			/>
			<Coin
				coin_name="ETH"
				coin_price={400}
				coin_variation={{ time: "24h", variation: 5 }}
			/>
			<Coin
				coin_name="LTC"
				coin_price={300}
				coin_variation={{ time: "24h", variation: -2 }}
			/>
			<Coin
				coin_name="XRP"
				coin_price={200}
				coin_variation={{ time: "24h", variation: 8 }}
			/>
			<Coin
				coin_name="ADA"
				coin_price={100}
				coin_variation={{ time: "24h", variation: -1 }}
			/>
		</div>
	);
}
