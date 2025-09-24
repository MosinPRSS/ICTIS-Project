"use client";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const bot: IBot = {
	id: 1,
	name: "bot1",
	author: "author1",
	description: "description1",
	publicDescription: "publicDescription1",
	tags: ["tag1"],
	link: "https://github.com/username/bot1",
	isPublic: true,
};

const BotPage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const { selectedTheme } = useSelector((state: RootState) => state);

	const navigate = useRouter();

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	return (
		<div
			className={`p-10 ${selectedTheme.options.text} absolute left-0 top-0 w-full min-h-full h-fit overflow-y-scroll backdrop-blur-3xl `}
		>
			<button
				className={`mb-10 rounded-[10px] border-1 px-5 py-3 ${selectedTheme.options.border}`}
				onClick={navigate.back}
			>
				Назад
			</button>
			<div className={`w-full min-h-full flex flex-col gap-10 relative`}>
				<div className="flex items-center justify-between gap-10">
					<div className="flex gap-5">
						<div className="rounded-[10px] bg-black border-[1px] w-50 h-50"></div>
						<div className="flex flex-col justify-between h-60">
							<div>
								<h1 className="text-5xl mb-3">{bot.name}</h1>
								<p>
									{bot.isPublic
										? "Публичный бот"
										: "Приватный бот"}
								</p>
							</div>
							<Link
								className={`mb-10 text-center rounded-[10px] border-1 px-5 py-3 ${selectedTheme.options.border}`}
								href={{
									pathname: "/chats",
									query: {
										bot: "w",
									},
								}}
							>
								Чат
							</Link>
						</div>
					</div>
				</div>
				<div className={`flex gap-3 w-full justify-between flex-col`}>
					<div
						className={`w-full flex flex-wrap justify-between items-center gap-5`}
					>
						<div className="flex flex-col gap-3 w-[45%]">
							<p>Имя</p>
							<p
								className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
							>
								{bot.name}
							</p>
						</div>
						<div className="flex flex-col gap-3 w-[45%]">
							<p>Описание</p>
							<p
								className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
							>
								{bot.description}
							</p>
						</div>
						<div className="flex flex-col gap-3 w-[45%]">
							<p>Публичное описание</p>
							<p
								className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
							>
								{bot.publicDescription}
							</p>
						</div>
						<div className="flex items-center gap-3 flex-wrap">
							<p>Теги: </p>
							{bot.tags.map((tag) => (
								<span
									key={tag}
									className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-2`}
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BotPage;
