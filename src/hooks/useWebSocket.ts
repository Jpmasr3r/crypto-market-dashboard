import { useEffect, useState } from "react";
import { binance24hrTicker } from "@/lib/websocket";

export function useWebSocket(path: string): {
	data: typeof binance24hrTicker;
	connected: boolean;
} {
	const [data, setData] =
		useState<typeof binance24hrTicker>(binance24hrTicker);
	const [connected, setConnected] = useState<boolean>(false);

	useEffect(() => {
		const ws = new WebSocket(path);

		ws.onopen = (): void => setConnected(true);

		ws.onmessage = (event: { data: string }): void => {
			setData(JSON.parse(event.data));
		};

		ws.onclose = (): void => setConnected(false);

		return (): void => ws.close();
	}, [path]);

	return {
		data,
		connected,
	};
}
