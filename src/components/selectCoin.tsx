import type { JSX } from "react";
import type { TickerSymbol } from "@/lib/types";
import { cryptoPairs } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type props = {
	symbol: string;
	setSymbol: (symbol: TickerSymbol) => void;
};

export default function SelectCoin({ setSymbol, symbol }: props): JSX.Element {
	return (
		<Select onValueChange={setSymbol} value={symbol}>
			<SelectTrigger
				className="min-w-1/10 w-fit font-bold border-2 rounded-sm flex justify-center
			items-center"
			>
				<SelectValue placeholder="Choose a coin" />
			</SelectTrigger>
			<SelectContent
				className="bg-secondary border-2 w-1/2 min-w-fit h-1/2 flex justify-center 
                items-center text-white p-2 gap-4 m-2 rounded-sm"
			>
				{cryptoPairs.map((pair) => {
					if (symbol === pair) {
						return (
							<SelectItem
								key={pair}
								value={pair}
								className="border-b border-t p-2 gap-4 m-2 rounded-none
                                    flex justify-center items-center font-bold bg-white text-secondary
                                    border-secondary"
							>
								<p>{pair.toUpperCase()}</p>
							</SelectItem>
						);
					}
					return (
						<SelectItem
							key={pair}
							value={pair}
							className="border-b border-t p-2 gap-4 m-2 rounded-none
                                flex justify-center items-center bg-secondary text-white 
                                hover:bg-white hover:border-secondary hover:text-secondary"
						>
							<p>{pair.toUpperCase()}</p>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
