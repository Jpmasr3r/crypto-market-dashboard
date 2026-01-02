import type { Binance24hrTicker, TickerListener24h, TickerSymbol } from "./types";

export const defaultBinance24hrTicker: Binance24hrTicker = {
	e: "",
	E: 0,
	s: "",
	p: "",
	P: "",
	w: "",
	x: "",
	c: "",
	Q: "",
	b: "",
	B: "",
	a: "",
	A: "",
	o: "",
	h: "",
	l: "",
	v: "",
	q: "",
	O: 0,
	C: 0,
	F: 0,
	L: 0,
	n: 0,
};

const API: string = "wss:stream.binance.com:9443/ws";
export const ws: WebSocket = new WebSocket(API);

// const listeners24h: Map<TickerSymbol, TickerListener24h[]> = new Map();
const listeners24h: Map<TickerSymbol, Map<string, TickerListener24h>> = new Map();
const pendingSubscriptions: Set<TickerSymbol> = new Set();

type BinanceSubscribeMessage = {
	method: "SUBSCRIBE" | "UNSUBSCRIBE";
	params: readonly string[];
	id: number;
};

function send(message: BinanceSubscribeMessage): void {
	ws.send(JSON.stringify(message));
}

function subscribeMessage(symbol: TickerSymbol): BinanceSubscribeMessage {
	return {
		method: "SUBSCRIBE",
		params: [`${symbol.toLowerCase()}@ticker`],
		id: Date.now(),
	};
}

function unsubscribeMessage(symbol: TickerSymbol): BinanceSubscribeMessage {
	return {
		method: "UNSUBSCRIBE",
		params: [`${symbol.toLowerCase()}@ticker`],
		id: Date.now(),
	};
}

export function socketSubscribe24h(
	symbol: TickerSymbol,
	listener: { ref: TickerListener24h; id: string }
): void {
	const key: TickerSymbol = symbol.toUpperCase();
	const allListeners24 = listeners24h.get(key);
	if (allListeners24) {
		allListeners24.set(listener.id, listener.ref);
		listeners24h.set(key, allListeners24);
	} else {
		const listenerMap = new Map<string, TickerListener24h>();
		listenerMap.set(listener.id, listener.ref);
		listeners24h.set(key, listenerMap);
	}

	if (ws.readyState === WebSocket.OPEN) {
		send(subscribeMessage(symbol));
	} else {
		pendingSubscriptions.add(symbol);
	}
}

export function socketUnsubscribe(symbol: TickerSymbol): void {
	const key: TickerSymbol = symbol.toUpperCase();
	listeners24h.delete(key);

	if (ws.readyState === WebSocket.OPEN) {
		send(unsubscribeMessage(symbol));
	}

	pendingSubscriptions.delete(symbol);
}

export function removeListener(key: TickerSymbol, id: string): void {
	const allListeners24: Map<string, TickerListener24h> | undefined =
		listeners24h.get(key.toUpperCase());
	if (!allListeners24) return;

	allListeners24.delete(id);
	if (allListeners24.size <= 0) {
		socketUnsubscribe(key);
	}
}

ws.onopen = (): void => {
	pendingSubscriptions.forEach((symbol: TickerSymbol): void => {
		send(subscribeMessage(symbol));
	});
	pendingSubscriptions.clear();
};

ws.onmessage = (event: MessageEvent<string>): void => {
	console.log("Active symbols:", listeners24h.size);
	const data: Binance24hrTicker = JSON.parse(event.data);
	const listener24h: Map<string, TickerListener24h> | undefined = listeners24h.get(
		data.s
	);
	if (listener24h) {
		listener24h.forEach((listener) => {
			listener(data as Binance24hrTicker);
		});
	}
};
