export interface Binance24hrTicker {
	e: string;
	E: number;
	s: string;
	p: string;
	P: string;
	w: string;
	x: string;
	c: string;
	Q: string;
	b: string;
	B: string;
	a: string;
	A: string;
	o: string;
	h: string;
	l: string;
	v: string;
	q: string;
	O: number;
	C: number;
	F: number;
	L: number;
	n: number;
}

export interface ChartPoint {
	time: string;
	// price: CoinPrice;
	// symbol: TickerSymbol;
	[key: string]: number | string;
}

export type CoinPrice = number;
export type TickerSymbol = string;

export type TickerListener24h = (data: Binance24hrTicker) => void;
export type TickerListener24hChart = (data: ChartPoint[]) => void;
