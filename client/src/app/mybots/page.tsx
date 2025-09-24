"use client";
import { addIcon } from "@/assets/images/images";
import BotSettings from "@/components/myBotsPage/BotSettings";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/interfaces";
import getMyBots from "@/services/getMyBots";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { motion } from "motion/react";
import NewBotSettings from "@/components/myBotsPage/NewBotSettings";

const newBot: IBot = {
	id: 0,
	name: "Новый бот",
	description: "Описание",
	avatar: "https://via.placeholder.com/150",
	tags: [],
};

const MyBotsPage = () => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [myBots, setMyBots] = useState<IBot[] | null>(null);
	const [selectedBot, setSelectedBot] = useState<IBot | null>(null);

	async function getData() {
		try {
			const data = await getMyBots();
			setMyBots(data);
		} catch (error) {
			setMyBots(null);
			console.log(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	return (
		<div
			className={`flex w-full h-full p-10 overflow-y-scroll gap-5 ${
				selectedTheme.options.text
			} ${userDevice === "mobile" && "flex-col"}`}
		>
			<div className="flex flex-col gap-5">
				<h1 className="text-3xl">Мои боты</h1>

				<div className={`p-10 flex flex-wrap gap-7`}>
					<div
						className={`flex justify-center items-center w-[15rem] h-[20rem] gap-10 border-[1px] rounded-[10px] ${selectedTheme.options.border} ${selectedTheme.options.elementBackground}`}
					>
						<motion.button
							className={`w-30 h-30 p-5 transition duration-200 rounded-full border-[1px] ${selectedTheme.options.border} ${selectedTheme.options.elementBackground}`}
							onHoverStart={(e) => {
								e.target.style.scale = "1.1";
								e.target.style.transform = "rotate(90deg)";
							}}
							onHoverEnd={(e) => {
								e.target.style.scale = "1";
								e.target.style.transform = "rotate(180deg)";
							}}
							onClick={() => {
								setSelectedBot(newBot);
							}}
						>
							<Image
								className="w-full h-full"
								src={addIcon}
								alt="add-icon"
							></Image>
						</motion.button>
					</div>
					{myBots &&
						myBots.length > 0 &&
						myBots.map((bot) => (
							<button
								key={bot.id}
								className={`text-left flex flex-col w-[15rem] h-[20rem] ${selectedTheme.options.middleground} p-2 border-[1px] border-white hover:scale-105 rounded-[5px]`}
								onClick={() => setSelectedBot(bot)}
							>
								<div className="w-full rounded-t-xl h-[50%] bg-black"></div>
								<div className="flex flex-col gap-2 p-3">
									<p>{bot.name}</p>
									<p>by {bot.author}</p>
									<p>{bot.description}</p>
									<p>Теги: {bot.tags}</p>
								</div>
							</button>
						))}
				</div>
			</div>
			{selectedBot !== null ? (
				selectedBot.id !== 0 ? (
					<BotSettings
						initialBot={selectedBot}
						setSelectedBot={setSelectedBot}
						getBot={getData}
					/>
				) : (
					<NewBotSettings
						setSelectedBot={setSelectedBot}
						myBots={myBots}
						setMyBots={setMyBots}
					/>
				)
			) : (
				<></>
			)}
		</div>
	);
};

export default MyBotsPage;
