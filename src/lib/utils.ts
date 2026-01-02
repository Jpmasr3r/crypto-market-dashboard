import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TickerSymbol } from "./types";

// biome-ignore lint/nursery/useExplicitType: internal function
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const cryptoPairs: TickerSymbol[] = [
	"btcusdt",
	"btcbrl",
	"ethusdt",
	"ethbrl",
	"bnbusdt",
	"bnbbrl",
	"solusdt",
	"solbrl",
	"adausdt",
	"adabrl",
	"xrpusdt",
	"xrpbrl",
	"dogeusdt",
	"dogebrl",
	"maticusdt",
	"maticbrl",
	"ltcusdt",
	"ltcbrl",
	"avaxusdt",
	"avaxbrl",
] as const;

export function generateId(): string {
	return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
