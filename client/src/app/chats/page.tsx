"use client";
import Loading from "@/components/Loading";
import { useWindow } from "@/hooks/window";
import getChats from "@/services/getChats";
import { initChats, setSelectedChat } from "@/store/slices/chatsSlice";
import { RootState } from "@/store/store";
import { select } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface Message {
	id: string;
	content: string;
	isBot: boolean;
	timestamp: string;
}

interface Chat {
	id: string;
	name: string;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
	isPinned: boolean;
}

interface Bot {
	id: string;
	name: string;
	avatar: string;
	author: string;
	description: string;
	tags: string[];
	lastMessage: string;
	lastMessageTime: string;
	messageCount: number;
	chats: Chat[];
}

const ChatInterface: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { chats } = useSelector((state: RootState) => state.chats);

	const dispatch = useDispatch();

	useEffect(() => {
		(async function getBots() {
			try {
				setIsLoading(true);
				const data = await getChats();
				dispatch(
					initChats([
						{
							id: "11",
							name: "Bot 11",
							author: "author 6",
							description:
								"Умный ассистент для решения различных задач",
							tags: ["Природа", "Игры"],
							lastMessage:
								"Здравствуй! Я твой виртуальный собеседник. О чём поговорим?",
							lastMessageTime: "2 мин назад",
							messageCount: 23,
							chats: [
								{
									id: "1",
									name: "Чат с Bot 11",
									messages: [
										{
											id: "1",
											content:
												"Здравствуй! Я твой виртуальный собеседник. О чём поговорим?",
											isBot: true,
											timestamp: "10:30",
										},
										{
											id: "2",
											content: "Привет! Как дела?",
											isBot: false,
											timestamp: "10:31",
										},
										{
											id: "3",
											content:
												"Всё отлично, спасибо! Готов помочь с любыми вопросами.",
											isBot: true,
											timestamp: "10:31",
										},
									],
									createdAt: "2024-01-15T10:30:00.000Z",
									updatedAt: "2024-01-15T10:31:00.000Z",
									isPinned: true,
								},
								{
									id: "2",
									name: "Обсуждение проекта",
									messages: [
										{
											id: "1",
											content:
												"Давайте обсудим ваш проект. С чего начнем?",
											isBot: true,
											timestamp: "14:20",
										},
									],
									createdAt: "2024-01-16T14:20:00.000Z",
									updatedAt: "2024-01-16T14:20:00.000Z",
									isPinned: false,
								},
							],
						},
					])
				);
			} catch (error) {
				dispatch(initChats(null));
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const filteredBots =
		chats &&
		chats.filter(
			(bot) =>
				bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				bot.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);

	const getFirstChatForBot = (bot: Bot) => {
		return bot.chats.length > 0 ? bot.chats[0] : null;
	};

	const getLastMessage = (chat: Chat) => {
		return chat.messages.length > 0
			? chat.messages[chat.messages.length - 1].content
			: "Нет сообщений";
	};

	return (
		<div className={`flex flex-col h-full w-full p-10`}>
			<h1 className="text-2xl font-bold text-white mb-6">Чаты</h1>

			<div className="relative mb-6">
				<input
					type="text"
					placeholder="Поиск ботов..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
				/>
			</div>

			{isLoading ? (
				<Loading />
			) : (
				chats && (
					<div className="space-y-4 flex-1 overflow-y-auto">
						{filteredBots.map((bot) => {
							const firstChat = getFirstChatForBot(bot);

							return (
								<Link
									href={`/chats/${bot.id}`}
									key={bot.id}
									className="flex items-center gap-4 p-4 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-200"
									onClick={() => {
										localStorage.setItem(
											"selectedChat",
											JSON.stringify(bot)
										);
									}}
								>
									<div className="relative">
										<Image
											src={bot.avatar}
											alt={bot.name}
											className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400/30"
											width={48}
											height={48}
										/>
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<h3 className="font-semibold text-white truncate">
												{bot.name}
											</h3>
											<span className="text-xs text-white/60">
												{bot.lastMessageTime}
											</span>
										</div>

										{firstChat ? (
											<>
												<p className="text-sm text-white/70 truncate mb-1">
													{firstChat.name}
												</p>
												<p className="text-xs text-white/50 truncate">
													{getLastMessage(firstChat)}
												</p>
											</>
										) : (
											<p className="text-sm text-white/70">
												Нет доступных чатов
											</p>
										)}
									</div>
								</Link>
							);
						})}

						{filteredBots.length === 0 && (
							<div className="text-center py-8 text-white/60">
								<p>Боты не найдены :/</p>
							</div>
						)}
					</div>
				)
			)}
		</div>
	);
};

export default ChatInterface;
