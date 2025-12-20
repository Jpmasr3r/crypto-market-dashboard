import type { JSX } from "react";
import CoinsList from "./components/Coins_list";
import SplitMenu from "./components/SplitMenu";

export default function Home(): JSX.Element {
	return (
		<main className="h-full w-full flex flex-row">
			<SplitMenu />
			<CoinsList />
		</main>
	);
}
