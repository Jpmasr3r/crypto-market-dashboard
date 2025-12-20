import type { Metadata } from "next";
import "./globals.css";
import type { JSX } from "react";

export const metadata: Metadata = {
	title: "Crypto Market Dashboard",
	description: "A dashboard to monitor cryptocurrency prices and variations.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang="pt-BR">
			<body className="min-h-screen bg-primary h-screen w-screen">
				<main className="h-full w-full flex-1">{children}</main>
			</body>
		</html>
	);
}
