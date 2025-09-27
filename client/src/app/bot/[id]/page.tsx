"use client";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import useBotService from "@/api/bot_service";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import useSessionService from "@/api/session_service";
import { useDispatch } from "react-redux";
import { openMessage } from "@/store/slices/messageSlice";

const BotPage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [bot, setBot] = useState<IBot>();
	const [isLoading, setIsLoading] = useState(false);
	const { selectedTheme } = useSelector((state: RootState) => state);
	const { readBot } = useBotService();
	const { readSessions, createSession } = useSessionService();

	const router = useRouter();
	const params = useParams();
	const dispatch = useDispatch();

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

	const redirect = async (e: MouseEvent, id: string) => {
		try {
			e.preventDefault();

			const sessionsResponse = await readSessions();
			if (!sessionsResponse) {
				throw new Error("Failed to get sessions");
			}

			const session = sessionsResponse.find(
				(session) => session.chatbot.id === id
			);
			if (session) {
				console.log(session);

				sessionStorage.setItem("selectedChat", JSON.stringify(session));
				router.push(`/chats/${session.id}`);
			} else {
				const newSession = await createSession(
					"4cbb52a8-d84e-4cf6-8ff6-808e39e7f72c",
					id
				);
				if (newSession) {
					console.log(newSession);

					sessionStorage.setItem(
						"selectedChat",
						JSON.stringify(newSession)
					);
					router.push(`/chats/${newSession.id}`);
				}
			}
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
		}
	};
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
											{bot.is_public
												? "Публичный бот"
												: "Приватный бот"}
										</p>
									</div>
									<button
										className={`mb-10 text-center rounded-[10px] border-1 px-5 py-3 ${selectedTheme.options.border}`}
										onClick={(e) => redirect(e, bot.id)}
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
				</div>
			) : (
				<p className="text-center">Бот не найден</p>
			)}
		</>
	);
};

export default BotPage;
