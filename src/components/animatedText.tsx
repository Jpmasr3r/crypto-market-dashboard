"use client";

import { type HTMLAttributes, type JSX, useState } from "react";

type props = {
	frames: string[];
	speed?: number;
} & HTMLAttributes<HTMLSpanElement>;

export default function AnimatedText({
	frames,
	speed = 1000,
	className,
}: props): JSX.Element {
	const [frame, setFrame] = useState<string>(frames[0]);

	setInterval(() => {
		const indexNewFrame: number = frames.indexOf(frame);
		if (indexNewFrame < 0 || !frames.at(indexNewFrame + 1)) {
			setFrame(frames[0]);
			return;
		}

		setFrame(frames[indexNewFrame + 1]);
	}, speed);

	return (
		<p className={`font-bold text-white p-2 gap-4 m-2 ${className}`}>{frame}</p>
	);
}
