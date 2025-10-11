"use client";
import useSessionService from "@/api/session_service";
import { questionIcon } from "@/assets/images/images";
import Loading from "@/components/Loading";
import { initChats } from "@/store/slices/chatsSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ChatInterface: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { readSessions } = useSessionService();
	const { chats } = useSelector((state: RootState) => state.chats);
	const [filteredChats, setFilteredChats] = useState(chats);

	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredChats(chats);
			return;
		}
		setFilteredChats(
			chats.filter((chat) =>
				chat.chatbot.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			)
		);
	}, [searchQuery]);

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
				setFilteredChats(response);
			} catch (error) {
				dispatch(initChats(null));
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const redirect = async (e: MouseEvent, chat) => {
		e.preventDefault();

		router.push(`/chats/${chat.id}`);
	};

	return (
		<div className={`flex flex-col h-full w-full p-10`}>
			<h1 className="text-2xl font-bold text-white mb-6">Чаты</h1>

			<div className="relative mb-6">
				<input
					type="text"
					placeholder="Поиск"
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
											width={40}
											height={40}
										/>
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<h3 className="font-semibold text-white truncate">
												{chat.chatbot.name}
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
