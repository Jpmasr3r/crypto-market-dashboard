import type { JSX } from "react";

export default function Coin({
	coin_name,
	coin_price,
	coin_variation,
}: {
	coin_name: string;
	coin_price: number;
	coin_variation: {
		time: string;
		variation: number;
	};
}): JSX.Element {
	const color =
		coin_variation.variation >= 0
			? {
					textColor: "text-green",
					rotate: "-rotate-45",
					background: "bg-green/25",
				}
			: {
					textColor: "text-red",
					rotate: "rotate-45",
					background: "bg-red/25",
				};

	return (
		<div className="h-full flex flex-1 flex-col bg-secundary p-2 m-2 justify-start items-start rounded-lg">
			<h1 className="text-gray font-bold p-2">{coin_name}</h1>
			<h1 className="text-white font-bold p-2 text-2xl">
				R$ {coin_price.toFixed(2)}
			</h1>
			<p
				className={`${color.textColor} p-2 w-3/4 font-bold flex flex-row items-center`}
			>
				<span
					className={`
						${color.background} 
						${color.rotate} 
						rounded-full 
						p-1 
						text-2xl 
						aspect-square 
						flex 
						items-center 
						justify-center 
						mr-2
						w-8
						h-8
					`}
				>
					→
				</span>
				{coin_variation.variation}% {coin_variation.time}
			</p>
		</div>
	);
}
