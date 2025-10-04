"use client";
import { addIcon } from "@/assets/images/images";
import BotSettings from "@/components/myBotsPage/BotSettings";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { motion } from "motion/react";
import NewBotSettings from "@/components/myBotsPage/NewBotSettings";
import Message from "@/components/Message";
import useBotService from "@/api/bot_service";

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

	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [myBots, setMyBots] = useState<IBot[] | null>(null);
	const [selectedBot, setSelectedBot] = useState<IBot | null>(null);

	async function getData() {
		try {
			const data = await listUserBots();
			if (!data) {
				throw new Error("Failed to get user bots");
			}

			setMyBots(data.results);
		} catch (error) {
			setMyBots(null);
			console.log(error);
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

	async function eeeBaby(e: MouseEvent) {
		e.preventDefault();
		for (const i of "стас ты пидор я просил тебя сделать мне 100 ботов для проверки пагинации на главной странице но ты так и не сделал этого теперь я вынужден выкручиваться и рукаблудить кодом чтобы сотворить чудо ну это пездец кончено я твой рот крутил членом огромным 50 см пошол пездец стас ты пидор я просил тебя сделать мне 100 ботов для проверки пагинации на главной странице но ты так и не сделал этого теперь я вынужден выкручиваться и рукаблудить кодом чтобы сотворить чудо ну это пездец кончено я твой рот крутил членом огромным 50 см пошол пездец стас ты пидор я просил тебя сделать мне 100 ботов для проверки пагинации на главной странице но ты так и не сделал этого теперь я вынужден выкручиваться и рукаблудить кодом чтобы сотворить чудо ну это пездец кончено я твой рот крутил членом огромным 50 см пошол пездец стас ты пидор я просил тебя сделать мне 100 ботов для проверки пагинации на главной странице но ты так и не сделал этого теперь я вынужден выкручиваться и рукаблудить кодом чтобы сотворить чудо ну это пездец кончено я твой рот крутил членом огромным 50 см пошол пездец".split(
			" "
		)) {
			try {
				const response = createBot({
					name: `${i}`,
					chatname: "стас сасат",
					description: "стас сасат",
					public_description: "стас сасат",
					scenario: "стас сасат",
					first_message: "стас сасат",
					avatar: "https://via.placeholder.com/150",
					tags: ["стас сасат"],
					is_public: true,
				});
				if (!response) throw new Error("a");
			} catch {
				return;
			}
		}
	}

	return (
		<div
			className={`flex w-full h-full p-10 overflow-y-scroll gap-5 ${
				selectedTheme.options.text
			} ${userDevice === "mobile" && "flex-col"}`}
		>
			<div className="flex flex-col gap-5">
				<h1 className="text-3xl">Мои боты</h1>
				<button onClick={(e) => eeeBaby(e)}>
					<Image src={addIcon} width={20} height={20} alt="o" />
				</button>

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
								<div className="h-[50%] bg-black">
									<Image
										src={bot.avatar}
										alt="bot-avatar"
										width={30}
										height={30}
									/>
								</div>
								<div className="flex flex-col gap-2 p-3 h-[50%] overflow-y-hidden">
									<p>{bot.name}</p>
									<p>by {bot.author}</p>
									<p>{bot.description}</p>
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
			) : (
				<></>
			)}
			{message.isOpen && <Message />}
		</div>
	);
};

export default MyBotsPage;
