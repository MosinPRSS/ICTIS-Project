"use client";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/entries";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBotService from "@/api/bot_service";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import CreateSession from "@/components/botPage/CreateSession";
import { showAuth } from "@/store/slices/userSlice";
import Image from "next/image";

const BotPage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [bot, setBot] = useState<IBot>();
	const [isLoading, setIsLoading] = useState(false);
	const { selectedTheme, user } = useSelector((state: RootState) => state);
	const { readBot } = useBotService();

	const [isCreatingSession, setIsCreatingSession] = useState(false);

	const router = useRouter();
	const params = useParams();
	const dispatch = useDispatch();

	function checkAuth() {
		if (!user.user) {
			dispatch(showAuth(true));
		} else {
			setIsCreatingSession(true);
		}
	}

	function redirectToAuthor() {
		if (!user.user) {
			dispatch(showAuth(true));
			return;
		}

		const userID = localStorage.getItem("userID");
		if (userID === bot.user.id) {
			router.push("/profile");
		} else {
			router.push(`/user/${bot.user.id}`);
		}
	}

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);
				const response = await readBot(params.id);

				console.log(response);

				if (!response) {
					throw new Error("Failed to get bot");
				}

				setBot(response);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : bot ? (
				<div
					className={`p-10 ${selectedTheme.options.text} absolute left-0 top-0 w-full min-h-full h-fit overflow-y-scroll backdrop-blur-3xl `}
				>
					<button
						className={`mb-10 rounded-[10px] border-1 px-5 py-3 ${selectedTheme.options.border}`}
						onClick={() => router.back()}
					>
						Назад
					</button>
					<div
						className={`w-full min-h-full px-5 flex flex-col gap-10 relative`}
					>
						<div className="flex flex-wrap items-center justify-between gap-10">
							<div
								className={`flex gap-5 p-10 rounded-[10px] ${selectedTheme.options.elementBackground} ${selectedTheme.options.border} border-1`}
							>
								<Image
									src={bot.image}
									alt="bot"
									width={200}
									height={200}
									className="border-1 border-amber-50 rounded-[10px] h-fit"
								/>
								<div className="flex flex-col gap-15 justify-between h-full">
									<div>
										<h1 className="text-5xl mb-3">
											{bot.name}
										</h1>
										<p>
											Автор:{" "}
											<button
												onClick={() =>
													redirectToAuthor()
												}
												className="underline hover:text-amber-600"
											>
												{bot.user.username}
											</button>
										</p>
									</div>
									<button
										className={`w-[10rem] text-center rounded-[10px] border-1 px-5 py-3 ${selectedTheme.options.border}`}
										onClick={() => checkAuth()}
									>
										Чат
									</button>
								</div>
							</div>
							<div className="flex gap-10 w-fit">
								<div
									className={`flex flex-col gap-3 w-fit ${selectedTheme.options.elementBackground} p-5 rounded-[10px] ${selectedTheme.options.border} border-1`}
								>
									<p>Имя</p>
									<p
										className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3 ${selectedTheme.options.border} border-1`}
									>
										{bot.name}
									</p>
								</div>
								<div
									className={`flex flex-col gap-3 w-fit ${selectedTheme.options.elementBackground} p-5 rounded-[10px] ${selectedTheme.options.border} border-1`}
								>
									<p>Теги: </p>
									{bot.tags &&
										bot.tags.map((tag) => (
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

						<div
							className={`w-full flex flex-wrap justify-between items-center gap-10`}
						>
							<div
								className={`flex flex-col gap-3 min-w-[315px] ${
									userDevice === "mobile"
										? "w-full"
										: "w-[45%]"
								} ${
									selectedTheme.options.elementBackground
								} p-5 rounded-[10px] ${
									selectedTheme.options.border
								} border-1`}
							>
								<p>Описание</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
								>
									{bot.description}
								</p>
							</div>
							<div
								className={`flex flex-col gap-3 min-w-[315px] ${
									userDevice === "mobile"
										? "w-full"
										: "w-[45%]"
								} ${
									selectedTheme.options.elementBackground
								} p-5 rounded-[10px] ${
									selectedTheme.options.border
								} border-1`}
							>
								<p>Публичное описание</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
								>
									{bot.public_description}
								</p>
							</div>
							<div
								className={`flex flex-col gap-3 min-w-[315px] ${
									userDevice === "mobile"
										? "w-full"
										: "w-[45%]"
								} ${
									selectedTheme.options.elementBackground
								} p-5 rounded-[10px] ${
									selectedTheme.options.border
								} border-1`}
							>
								<p>Сценарий</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
								>
									{bot.scenario}
								</p>
							</div>
							<div
								className={`flex flex-col gap-3 min-w-[315px] ${
									userDevice === "mobile"
										? "w-full"
										: "w-[45%]"
								} ${
									selectedTheme.options.elementBackground
								} p-5 rounded-[10px] ${
									selectedTheme.options.border
								} border-1`}
							>
								<p>Первое сообщение</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
								>
									{bot.first_message}
								</p>
							</div>
						</div>
					</div>
					{isCreatingSession && (
						<CreateSession
							setIsCreatingSession={setIsCreatingSession}
							botID={bot.id}
						/>
					)}
				</div>
			) : (
				<p className="text-center">Бот не найден</p>
			)}
		</>
	);
};

export default BotPage;
