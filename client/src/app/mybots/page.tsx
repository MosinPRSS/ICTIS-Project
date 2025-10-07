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
		<div className="bg-gradient-to-r from-[#7F6AAD] to-[#5F4B8B] text-white/80 p-6 min-h-screen font-sans">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-white/60 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
						Мои боты
					</h1>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/90 border-r-2 border-white/30"></div>
					</div>
				) : (
					<div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
						<motion.button
							className="bg-gradient-to-l from-[#7F6AAD] to-[#7F6AAD] backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card min-h-[300px] flex flex-col items-center justify-center gap-4"
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
<<<<<<< HEAD
								<motion.button
									key={bot.id}
									className="bg-gradient-to-l from-[#7F6AAD] to-[#7F6AAD] backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card min-h-[300px] text-left flex flex-col overflow-hidden"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setSelectedBot(bot)}
								>
									<div className="w-full h-[120px] rounded-2xl bg-gradient-to-br from-violet-600/30 to-violet-800/30 backdrop-blur-sm mb-4 flex items-center justify-center border-2 border-white/20">
										<Image
											src={bot.avatar}
											alt={bot.name}
											width={80}
											height={80}
											className="rounded-xl border-2 border-white/20"
										/>
									</div>
									
									<div className="flex flex-col gap-3 flex-1">
										<h3 className="text-xl font-bold text-white break-words bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent line-clamp-2">
											{bot.name}
										</h3>
										<div className="flex items-center gap-2 text-white/60 text-sm">
											<span>by</span>
											<span className="text-white/80">{bot.author}</span>
										</div>
										<div className="bg-gradient-to-br from-violet-600/30 to-violet-800/30 backdrop-blur-sm rounded-2xl p-3 flex-1 border-2 border-white/20">
											<p className="text-white/80 text-sm line-clamp-3">
												{bot.description || "Описание отсутствует"}
											</p>
										</div>
									</div>
								</motion.button>
=======
								<Card
									key={bot.id}
									entity={bot}
									fun={setSelectedBot}
									arg={bot}
								/>
>>>>>>> 6225e14f4361412a6f758df9430bf2648f4912d1
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

			<style jsx>{`
				.custom-border-card {
					position: relative;
					background-clip: padding-box;
				}

				.custom-border-card::before {
					content: '';
					position: absolute;
					top: -2px;
					left: -2px;
					right: -2px;
					bottom: -2px;
					background: linear-gradient(to left, rgba(255,255,255,0.4), rgba(255,255,255,0.2), rgba(255,255,255,0));
					border-radius: 24px;
					z-index: -1;
					opacity: 0.8;
					transition: opacity 0.5s ease;
				}

				.custom-border-card:hover::before {
					opacity: 1;
				}

				.line-clamp-2 {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.line-clamp-3 {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</div>
	);
};

export default MyBotsPage;