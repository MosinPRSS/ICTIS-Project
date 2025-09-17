"use client";

import { searchIcon } from "@/assets/images/images";
import BotCards from "@/components/mainPage/BotCards";
import Tags from "@/components/mainPage/Tags";
import { useWindow } from "@/hooks/window";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedBots, setSelectedBots] = useState<string | null>(null);
	const input = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.current) {
			findBots(input.current.value);
		}
	};

	function findBots(input: string) {
		setSelectedBots(input === "" ? null : input);
	}

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	return (
		<div className="flex flex-col gap-5">
			<div
				className={`flex grow justify-between items-start w-full ${
					userDevice === "mobile" && "flex-col gap-5"
				}`}
			>
				<h1 className="playpen text-4xl text-white">
					Добро пожаловать, Qua11ra!
				</h1>
				<form
					id="search-form"
					action=""
					className={`flex ${
						userDevice === "tablet" &&
						"flex-col items-end space-y-3"
					} justify-end`}
					onSubmit={(event) => handleSubmit(event)}
				>
					<input
						ref={input}
						type="text"
						className="rounded-[5px] border-[1px] border-white p-2 text-white bg-transparent outline-none"
					/>
					<button className="border-[1px] border-white rounded-[5px] p-2 w-[42px] h-[42px] ml-3">
						<Image src={searchIcon} alt="search-icon" />
					</button>
				</form>
			</div>
			<Tags
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/>
			<div className="flex gap-10 items-center flex-wrap mt-20">
				<BotCards selectedTags={selectedTags} findBots={selectedBots} />
			</div>
		</div>
	);
}
