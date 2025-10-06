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
						className={`w-full min-h-full flex flex-col gap-10 relative`}
					>
						<div className="flex items-center justify-between gap-10">
							<div className="flex gap-5">
								<div className="rounded-[10px] bg-black border-[1px] w-50 h-50"></div>
								<div className="flex flex-col justify-between h-60">
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
										className={`mb-10 w-[10rem] text-center rounded-[10px] border-1 px-5 py-3 ${selectedTheme.options.border}`}
										onClick={() => checkAuth()}
									>
										Чат
									</button>
								</div>
							</div>
						</div>
						<div
							className={`flex gap-3 w-full justify-between flex-col`}
						>
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
									<p>Имя в чате</p>
									<p
										className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
									>
										{bot.chatname}
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
										{bot.public_description}
									</p>
								</div>
								<div className="flex flex-col gap-3 w-[45%]">
									<p>Сценарий</p>
									<p
										className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
									>
										{bot.scenario}
									</p>
								</div>
								<div className="flex flex-col gap-3 w-[45%]">
									<p>Первое сообщение</p>
									<p
										className={`${selectedTheme.options.text} ${selectedTheme.options.elementBackground} rounded-[10px] p-3`}
									>
										{bot.first_message}
									</p>
								</div>
								<div className="flex items-center gap-3 flex-wrap">
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
