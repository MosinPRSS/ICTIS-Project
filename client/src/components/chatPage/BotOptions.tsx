import useSessionService from "@/api/session_service";
import { cancelIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const BotOptions = ({
	setShowBotOptions,
	setShowGenerationSettings,
	setShowChatList,
	setChatsLoading,
	setBotChats,
	selectedChat,
}) => {
	const { readSessions } = useSessionService();
	const { selectedTheme } = useSelector((state: RootState) => state);

	const getBotsChats = async (e) => {
		e.preventDefault();
		setShowChatList(true);

		try {
			setChatsLoading(true);
			const response = await readSessions();

			if (!response) {
				throw new Error("Failed to get chats");
			}

			setBotChats(
				response.filter(
					(chat) => chat.chatbot.id === selectedChat.chatbot.id
				)
			);
		} catch (error) {
			setBotChats(undefined);
			console.log(error);
		} finally {
			setChatsLoading(false);
		}
	};
	return (
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className={`${selectedTheme.options.background} text-white rounded-2xl p-5 w-full max-w-md border border-white/10`}
			>
				<div className="flex items-center justify-between mb-5">
					<h3 className="text-lg font-semibold">Настройки</h3>
					<button
						onClick={() => setShowBotOptions(false)}
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

				<div className="space-y-3">
					<button
						onClick={() => {
							setShowGenerationSettings(true);
						}}
						className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
					>
						<span>Настройка генерации</span>
					</button>

					<button
						onClick={(e) => {
							getBotsChats(e);
						}}
						className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
					>
						<span>Список чатов</span>
					</button>

					{/* <button
                          onClick={() => {
                            setShowDeleteConfirm(true);
                            setShowBotOptions(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 transition-colors text-red-300"
                        >
                          <span>Удалить чат</span>
                        </button> */}
				</div>
			</div>
		</div>
	);
};

export default BotOptions;
