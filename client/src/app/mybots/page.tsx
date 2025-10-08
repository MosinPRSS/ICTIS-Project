"use client";
import { addIcon } from "@/assets/images/images";
import BotSettings from "@/components/myBotsPage/BotSettings";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/entries";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { motion } from "motion/react";
import NewBotSettings from "@/components/myBotsPage/NewBotSettings";
import Message from "@/components/Message";
import useBotService from "@/api/bot_service";
import Loading from "@/components/Loading";
import Card from "@/components/Card";

const newBot: IBot = {
	id: 0,
	name: "Новый бот",
	description: "Описание",
	avatar: "https://via.placeholder.com/150",
	tags: [],
};

const MyBotsPage = () => {
	const { selectedTheme, message, userBots, user } = useSelector(
		(state: RootState) => state
	);
	const { listUserBots, createBot, deleteBot } = useBotService();
	const [isLoading, setIsLoading] = useState(false);

	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [myBots, setMyBots] = useState<IBot[] | null>(null);
	const [selectedBot, setSelectedBot] = useState<IBot | null>(null);

	async function getData() {
		setIsLoading(true);
		try {
			const data = await listUserBots();
			if (!data) {
				throw new Error("Failed to get user bots");
			}

			setMyBots(data.results);
		} catch (error) {
			setMyBots(null);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (userBots.userBots) {
			setMyBots(userBots.userBots);
		} else {
			getData();
		}
	}, []);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		getData();
	}, [user.user]);

	return (
		<div className={`text-white/80 p-10 min-h-screen font-sans`}>
			<div className="max-w-7xl flex flex-col gap-10">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-white/60 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
						Мои боты
					</h1>
				</div>

				{isLoading ? (
					<Loading />
				) : (
					<div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
						<motion.button
							className={`${selectedTheme.options.middleground} backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card min-h-[300px] flex flex-col items-center justify-center gap-4`}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => {
								setSelectedBot(newBot);
							}}
						>
							<div className="relative group">
								<div className="bg-gradient-to-br from-[#7F6AAD]/60 to-[#5F4B8B]/60 rounded-2xl p-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
									<Image
										src={addIcon}
										alt="add-icon"
										width={80}
										height={80}
										className="transition-all duration-500 group-hover:rotate-90"
									/>
								</div>
								<div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</div>
							<span className="text-xl font-semibold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
								Добавить бота
							</span>
						</motion.button>

						{myBots &&
							myBots.length > 0 &&
							myBots.map((bot) => (
								<>
									<Card
										key={bot.id}
										entity={bot}
										fun={setSelectedBot}
										arg={bot}
									/>
								</>
							))}
					</div>
				)}
			</div>

			{/* Модалки */}
			{selectedBot !== null ? (
				selectedBot.id !== 0 ? (
					<BotSettings
						initialBot={selectedBot}
						setSelectedBot={setSelectedBot}
						updateBotsList={getData}
					/>
				) : (
					<NewBotSettings
						setSelectedBot={setSelectedBot}
						myBots={myBots}
						setMyBots={setMyBots}
						updateBotsList={getData}
					/>
				)
			) : null}

			{message.isOpen && <Message />}
		</div>
	);
};

export default MyBotsPage;
