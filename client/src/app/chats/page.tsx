"use client";
import useSessionService from "@/api/session_service";
import Loading from "@/components/Loading";
import { useWindow } from "@/hooks/window";
import getChats from "@/services/getChats";
import { initChats, setSelectedChat } from "@/store/slices/chatsSlice";
import { RootState } from "@/store/store";
import { select } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
	const { readSessions } = useSessionService();
	const { chats } = useSelector((state: RootState) => state.chats);

	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		(async function getBots() {
			try {
				setIsLoading(true);
				const response = await readSessions();
				console.log(response);

				if (!response) {
					throw new Error("Failed to get chats");
				}

				dispatch(initChats(response));
			} catch (error) {
				dispatch(initChats(null));
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const filteredChats =
		chats &&
		chats.filter(
			(chat) =>
				chat.chatbot.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				chat.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);

	const redirect = async (e: MouseEvent, chat) => {
		e.preventDefault();

		sessionStorage.setItem("selectedChat", JSON.stringify(chat));
		router.push(`/chats/${chat.id}`);
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
						{filteredChats.map((chat) => {
							return (
								<button
									key={chat.id}
									className="flex w-full items-center gap-4 p-4 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-200"
									onClick={(e) => redirect(e, chat)}
								>
									<div className="relative">
										<Image
											src={chat.chatbot.avatar}
											alt={chat.chatbot.name}
											className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400/30"
											width={48}
											height={48}
										/>
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<h3 className="font-semibold text-white truncate">
												{chat.chatbot.chatname}
											</h3>
										</div>

										<p className="text-sm text-white/70 truncate mb-1 text-start">
											{chat.last_message}
										</p>
									</div>
								</button>
							);
						})}

						{filteredChats.length === 0 && (
							<div className="text-center py-8 text-white/60">
								<p>Чаты не найдены :/</p>
							</div>
						)}
					</div>
				)
			)}
		</div>
	);
};

export default ChatInterface;
