import { cancelIcon } from "@/assets/images/images";
import Image from "next/image";
import React from "react";
import Loading from "../Loading";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChatList = ({
	setShowChatList,
	chatInfo,
	setShowDeleteConfirm,
	chatsLoading,
	botChats,
}) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	return (
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className={`${selectedTheme.options.background} rounded-2xl p-5 w-full max-w-md border border-white/10 h-[80vh] overflow-hidden flex flex-col`}
			>
				<div className="flex items-center justify-between mb-5">
					<h3 className="text-lg font-semibold text-white">
						Чаты с {chatInfo.chatbot.name}
					</h3>
					<button
						onClick={() => setShowChatList(false)}
						className="p-1 rounded-full hover:bg-white/10 transition-colors"
					>
						<Image
							src={cancelIcon}
							alt="cancel-icon"
							width={20}
							height={20}
						/>
					</button>
				</div>

				<div className="flex justify-between items-center flex-col space-y-4 h-full">
					{chatsLoading ? (
						<Loading />
					) : botChats ? (
						<>
							<div className="w-full h-full flex flex-col overflow-y-auto">
								{botChats.map((chat) => (
									<button
										key={chat.id}
										className={`bg-gray-600 w-full flex items-center gap-5 p-3 rounded-xl hover:bg-gray-300 transition-colors`}
									>
										<Image
											src={chat.chatbot.avatar}
											alt={chat.chatbot.name}
											width={40}
											height={40}
										/>

										<span>{chat.chatbot.chatname}</span>
									</button>
								))}
							</div>
							<div className="w-full pt-4 border-t border-white/10 flex flex-col gap-5">
								<button
									//onClick={() =>
									//createNewChat(chatInfo.id)
									//}
									className={`w-full flex justify-center items-center gap-3 p-3 rounded-xl hover:bg-white ${selectedTheme.options.elementBackground} transition-colors text-white font-medium`}
								>
									Создать новый чат
								</button>
								<button
									onClick={() => {
										setShowDeleteConfirm(true);
									}}
									className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 text-red-300 hover:text-red-200 transition-colors"
								>
									Удалить все чаты
								</button>
								<p className="text-xs text-gray-400 mt-2 text-center">
									Это действие нельзя отменить
								</p>
							</div>
						</>
					) : (
						<p className="text-white text-center">
							Не удалось загрузить чаты
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatList;
