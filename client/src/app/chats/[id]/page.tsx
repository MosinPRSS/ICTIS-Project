"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWindow } from "@/hooks/window";
import { useParams, useRouter } from "next/navigation";
import useSessionService from "@/api/session_service";
import Loading from "@/components/Loading";
import { openMessage } from "@/store/slices/messageSlice";
import { useDispatch } from "react-redux";
import {
	infoIcon,
	leftIcon,
	sendIcon,
	settingsIcon,
} from "@/assets/images/images";
import useMessageService from "@/api/message_service";
import BotOptions from "@/components/chatPage/BotOptions";
import GenerationSettings from "@/components/chatPage/GenerationSettings";
import ChatList from "@/components/chatPage/ChatList";
import BotInfo from "@/components/chatPage/BotInfo";
import DeleteConfirm from "@/components/chatPage/DeleteConfirm";
import Message from "@/components/chatPage/Message";
import { motion } from "motion/react";

const Chat = () => {
	const [showBotInfo, setShowBotInfo] = useState(false);
	const [showChatList, setShowChatList] = useState(false);
	const [showBotOptions, setShowBotOptions] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [showGenerationSettings, setShowGenerationSettings] = useState(false);
	const [messageInput, setMessageInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [messages, setMessages] = useState([]);
	const [botChats, setBotChats] = useState(null);
	const [chatsLoading, setChatsLoading] = useState(false);

	const { readSession } = useSessionService();
	const { sendMessage } = useMessageService();
	const dispatch = useDispatch();
	const [isMessageSending, setIsMessageSending] = useState(false);

	const router = useRouter();
	const params = useParams();

	const [chatInfo, setChatInfo] = useState(null);

	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);

				const response = await readSession(params.id);

				console.log(response);

				if (!response) {
					throw new Error("Failed to get data");
				}

				setChatInfo(response.session);
				setMessages(response.messages);
			} catch (error) {
				dispatch(openMessage("Произошла ошибка при загрузке чата"));
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const inputRef = useRef<HTMLInputElement>(null);

	const send = async (e: MouseEvent | KeyboardEvent) => {
		e.preventDefault();
		inputRef.current.disabled = true;
		setIsMessageSending(true);
		if (!messageInput.trim() || !chatInfo) return;

		const tempMessage = {
			id: `temp-${Date.now()}`,
			content: messageInput,
			role: "user",
			timestamp: new Date().toISOString(),
			status: "pending",
		};

		setMessages((prev) => [...prev, tempMessage]);

		try {
			const response = await sendMessage(params.id, messageInput);
			console.log(response);

			if (!response) {
				throw new Error("Failed to send message");
			}

			setMessages((prev) =>
				prev.map((message) =>
					message.id === tempMessage.id
						? { ...message, status: "sent" }
						: message
				)
			);
			setMessageInput("");
			setMessages((prev) => [...prev, response]);
		} catch (error) {
			setMessages((prev) =>
				prev.map((message) =>
					message.id === tempMessage.id
						? { ...message, status: "error" }
						: message
				)
			);
			dispatch(openMessage("Произошла ошибка при отправке сообщения"));
			console.log(error);
		} finally {
			inputRef.current.disabled = false;
			setIsMessageSending(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				chatInfo && (
					<div className={`flex flex-col h-full w-full relative`}>
						<div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
							<div
								className={`flex items-center justify-between`}
							>
								<div className="flex items-center gap-4">
									<button
										onClick={() => router.back()}
										className="p-2 rounded-lg mr-7 bg-white/10 hover:bg-white/20 transition-colors mr-2"
									>
										<Image
											src={leftIcon}
											alt="left-icon"
											width={20}
											height={20}
										/>
									</button>
									<Image
										src={chatInfo.chatbot.avatar}
										alt={chatInfo.chatbot.name}
										className="w-10 h-10 rounded-full object-cover"
										width={40}
										height={40}
									/>
									<div className="">
										<h2 className="font-semibold text-white truncate w-fit">
											{chatInfo.chatbot.name}
										</h2>
										<p className="text-sm text-purple-300 truncate w-fit">
											{chatInfo.chatbot.name}
										</p>
									</div>
								</div>

								<div
									className={`flex w-auto items-center gap-2
									}`}
								>
									<button
										onClick={() =>
											setShowBotOptions(!showBotOptions)
										}
										className="p-2 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition-colors"
									>
										<Image
											src={settingsIcon}
											alt="options-icon"
											width={20}
											height={20}
										/>
									</button>
									<button
										onClick={() =>
											setShowBotInfo(!showBotInfo)
										}
										className="p-2 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-colors"
									>
										<Image
											src={infoIcon}
											alt="info-icon"
											width={20}
											height={20}
										/>
									</button>
								</div>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
							{messages.map((message) => (
								<Message
									message={message}
									key={message.id}
									userDevice={userDevice}
									setMessages={setMessages}
								/>
							))}
						</div>

						<div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-4">
							<div className="flex items-center gap-3">
								<input
									ref={inputRef}
									type="text"
									placeholder="Напишите сообщение..."
									value={messageInput}
									onChange={(e) =>
										setMessageInput(e.target.value)
									}
									onKeyPress={(e) =>
										e.key === "Enter" && send(e)
									}
									className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
								/>
								<button
									onClick={(e) => send(e)}
									disabled={!messageInput.trim()}
									className="p-3 rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
									aria-label="Отправить сообщение"
								>
									{isMessageSending ? (
										<motion.div
											className="w-[20px] h-[20px] border-8 border-dotted border-white rounded-full top-1/2 left-1/2"
											animate={{ rotate: 360 }}
											transition={{
												duration: 2,
												repeat: Infinity,
												type: "spring",
											}}
										/>
									) : (
										<Image
											src={sendIcon}
											alt="send-icon"
											width={20}
											height={20}
										/>
									)}
								</button>
							</div>
						</div>
						{showBotOptions && (
							<BotOptions
								setShowBotOptions={setShowBotOptions}
								setBotChats={setBotChats}
								setChatsLoading={setChatsLoading}
								setShowGenerationSettings={
									setShowGenerationSettings
								}
								setShowChatList={setShowChatList}
								chatInfo={chatInfo}
							/>
						)}

						{showGenerationSettings && (
							<GenerationSettings
								setShowGenerationSettings={
									setShowGenerationSettings
								}
								chatInfo={chatInfo}
								setChatInfo={setChatInfo}
							/>
						)}

						{showChatList && (
							<ChatList
								setShowChatList={setShowChatList}
								chatInfo={chatInfo}
								botChats={botChats}
								chatsLoading={chatsLoading}
								setShowDeleteConfirm={setShowDeleteConfirm}
								// // createNewChat={createNewChat}
							/>
						)}

						{showBotInfo && (
							<BotInfo
								setShowBotInfo={setShowBotInfo}
								chatInfo={chatInfo.chatbot}
							/>
						)}

						{showDeleteConfirm && (
							<DeleteConfirm
								setShowDeleteConfirm={setShowDeleteConfirm}
								chatInfo={chatInfo}
								params={params}
							/>
						)}
					</div>
				)
			)}
		</>
	);
};

export default Chat;
