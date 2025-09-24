"use client";
import User from "@/utils/User";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWindow } from "@/hooks/window";

const Chat = () => {
	const [showBotInfo, setShowBotInfo] = useState(false);
	const [editingChatName, setEditingChatName] = useState("");
	const [showBotOptions, setShowBotOptions] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [showGenerationSettings, setShowGenerationSettings] = useState(false);
	const [messageInput, setMessageInput] = useState("");
	const [editingChatId, setEditingChatId] = useState<string | null>(null);

	const [selectedChat, setSelectedChat] = useState(
		JSON.parse(localStorage.getItem("selectedChat"))
	);
	console.log(selectedChat);

	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	// const updateChatName = (chatId: string, newName: string) => {
	// 	setChats((prev) =>
	// 		prev.map((chat) =>
	// 			chat.id === chatId ? { ...chat, name: newName } : chat
	// 		)
	// 	);
	// 	setEditingChatId(null);
	// };

	// const deleteChat = (chatId: string) => {
	// 	setChats((prev) => prev.filter((chat) => chat.id !== chatId));
	// 	if (selectedChat?.id === chatId) {
	// 		setSelectedChat(null);
	// 	}
	// 	setShowBotOptions(false);
	// };

	// const togglePinChat = (chatId: string) => {
	// 	setChats((prev) =>
	// 		prev.map((chat) =>
	// 			chat.id === chatId
	// 				? { ...chat, isPinned: !chat.isPinned }
	// 				: chat
	// 		)
	// 	);
	// };

	const sendMessage = () => {
		if (!messageInput.trim() || !selectedChat) return;

		const userMessage = {
			id: Date.now().toString(),
			content: messageInput,
			isBot: false,
			timestamp: new Date().toLocaleTimeString("ru", {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		const botResponse = {
			id: (Date.now() + 1).toString(),
			content: "Спасибо за сообщение! Я обдумываю ответ...",
			isBot: true,
			timestamp: new Date().toLocaleTimeString("ru", {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		// setChats((prev) =>
		// 	prev.map((chat) =>
		// 		chat.id === selectedChat.id
		// 			? {
		// 					...chat,
		// 					messages: [
		// 						...chat.messages,
		// 						userMessage,
		// 						botResponse,
		// 					],
		// 					updatedAt: new Date().toISOString(),
		// 			  }
		// 			: chat
		// 	)
		// );

		setSelectedChat((prev) =>
			prev
				? {
						...prev,
						messages: [...prev.messages, userMessage, botResponse],
						updatedAt: new Date().toISOString(),
				  }
				: prev
		);
		setMessageInput("");
	};

	return (
		selectedChat && (
			<div className={`flex flex-col h-full w-full`}>
				<div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
					<div className="flex items-center justify-between">
						{userDevice === "mobile" && (
							<button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors mr-2" />
						)}

						<div className="flex items-center gap-4 flex-1">
							<Image
								src={selectedChat.avatar}
								alt={selectedChat.name}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div className="flex-1 min-w-0">
								<h2 className="font-semibold text-white truncate">
									{selectedChat.name}
								</h2>
								<p className="text-sm text-purple-300 truncate">
									{selectedChat.name}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={() =>
									setShowBotOptions(!showBotOptions)
								}
								className="p-2 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition-colors"
							></button>
							<button
								onClick={() => setShowBotInfo(!showBotInfo)}
								className="p-2 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-colors"
							></button>
						</div>
					</div>
				</div>

				{showBotOptions && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-gray-900 rounded-2xl p-5 w-full max-w-md border border-white/10">
							<div className="flex items-center justify-between mb-5">
								<h3 className="text-lg font-semibold text-white">
									Опции чата
								</h3>
								<button
									onClick={() => setShowBotOptions(false)}
									className="p-1 rounded-full hover:bg-white/10 transition-colors"
								></button>
							</div>

							<div className="space-y-3">
								<button
									onClick={() => {
										setShowGenerationSettings(true);
										setShowBotOptions(false);
									}}
									className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white"
								>
									<span>Настройка генерации</span>
								</button>

								<button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white">
									<span>Новый чат</span>
								</button>

								<button
									onClick={() => {
										setShowBotOptions(false);
									}}
									className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white"
								>
									<span>Список чатов</span>
								</button>

								<button
									onClick={() => {
										setShowDeleteConfirm(true);
										setShowBotOptions(false);
									}}
									className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 transition-colors text-red-300"
								>
									<span>Удалить чат</span>
								</button>
							</div>
						</div>
					</div>
				)}

				{showGenerationSettings && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-gray-900 rounded-2xl p-5 w-full max-w-md border border-white/10">
							<div className="flex items-center justify-between mb-5">
								<h3 className="text-lg font-semibold text-white">
									Настройка генерации
								</h3>
								<button
									onClick={() =>
										setShowGenerationSettings(false)
									}
									className="p-1 rounded-full hover:bg-white/10 transition-colors"
								></button>
							</div>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-purple-300 mb-2">
										Температура
									</label>
									<input
										type="range"
										min="0"
										max="1"
										step="0.1"
										defaultValue="0.7"
										className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
									/>
									<div className="flex justify-between text-xs text-white/60 mt-1">
										<span>Более точный</span>
										<span>Более креативный</span>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-purple-300 mb-2">
										Максимальная длина
									</label>
									<input
										type="range"
										min="50"
										max="1000"
										step="50"
										defaultValue="200"
										className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
									/>
									<div className="flex justify-between text-xs text-white/60 mt-1">
										<span>Коротко</span>
										<span>Подробно</span>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-purple-300 mb-2">
										Стиль ответов
									</label>
									<select className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
										<option>Сбалансированный</option>
										<option>Профессиональный</option>
										<option>Креативный</option>
										<option>Краткий</option>
									</select>
								</div>

								<button
									onClick={() =>
										setShowGenerationSettings(false)
									}
									className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
								>
									Сохранить настройки
								</button>
							</div>
						</div>
					</div>
				)}

				{/* {showChatList && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-gray-900 rounded-2xl p-5 w-full max-w-md border border-white/10 max-h-[80vh] overflow-hidden flex flex-col">
							<div className="flex items-center justify-between mb-5">
								<h3 className="text-lg font-semibold text-white">
									Чаты с {selectedChat.name}
								</h3>
								<button
									onClick={() => setShowChatList(false)}
									className="p-1 rounded-full hover:bg-white/10 transition-colors"
								></button>
							</div>

							<div className="flex-1 overflow-y-auto space-y-4">
								<button
									onClick={() =>
										createNewChat(selectedChat.id)
									}
									className="w-full flex items-center gap-3 p-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium"
								>
									Создать новый чат
								</button>

								{getBotsChats(selectedChat.id).filter(
									(chat) => chat.isPinned
								).length > 0 && (
									<div>
										<h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide flex items-center gap-2">
											Закрепленные
										</h3>
										<div className="space-y-2">
											{getBotsChats(selectedChat.id)
												.filter((chat) => chat.isPinned)
												.map((chat) => (
													<ChatItem
														key={chat.id}
														chat={chat}
														isSelected={
															selectedChat?.id ===
															chat.id
														}
														onSelect={(chat) => {
															setSelectedChat(
																chat
															);
															setShowChatList(
																false
															);
														}}
														onEdit={
															setEditingChatId
														}
														onDelete={deleteChat}
														onTogglePin={
															togglePinChat
														}
														editingChatId={
															editingChatId
														}
														editingChatName={
															editingChatName
														}
														setEditingChatName={
															setEditingChatName
														}
														updateChatName={
															updateChatName
														}
													/>
												))}
										</div>
									</div>
								)}

								<div>
									<h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">
										Все чаты
									</h3>
									<div className="space-y-2">
										{getBotsChats(selectedChat.id)
											.filter((chat) => !chat.isPinned)
											.map((chat) => (
												<ChatItem
													key={chat.id}
													chat={chat}
													isSelected={
														selectedChat?.id ===
														chat.id
													}
													onSelect={(chat) => {
														setSelectedChat(chat);
														setShowChatList(false);
													}}
													onEdit={setEditingChatId}
													onDelete={deleteChat}
													onTogglePin={togglePinChat}
													editingChatId={
														editingChatId
													}
													editingChatName={
														editingChatName
													}
													setEditingChatName={
														setEditingChatName
													}
													updateChatName={
														updateChatName
													}
												/>
											))}
									</div>
								</div>

								{getBotsChats(selectedChat.id).length === 0 && (
									<div className="text-center py-8 text-white/60">
										<p>Пока нет чатов с этим ботом</p>
										<p className="text-sm mt-1">
											Создайте первый чат!
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)} */}

				<div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
					{selectedChat.chats[0].messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.isBot ? "justify-start" : "justify-end"
							}`}
						>
							<div
								className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
									message.isBot
										? "bg-white/10 text-white"
										: "bg-purple-600 text-white"
								}`}
							>
								<p className="text-sm">{message.content}</p>
								<p className="text-xs opacity-70 mt-1 text-right">
									{message.timestamp}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-4">
					<div className="flex items-center gap-3">
						<input
							type="text"
							placeholder="Напишите сообщение..."
							value={messageInput}
							onChange={(e) => setMessageInput(e.target.value)}
							onKeyPress={(e) =>
								e.key === "Enter" && sendMessage()
							}
							className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
						/>
						<button
							onClick={sendMessage}
							disabled={!messageInput.trim()}
							className="p-3 rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Отправить сообщение"
						></button>
					</div>
				</div>

				{showBotInfo && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10 max-h-[80vh] overflow-y-auto">
							<div className="flex items-center justify-between mb-5">
								<h3 className="text-lg font-semibold text-white">
									Информация о боте
								</h3>
								<button
									onClick={() => setShowBotInfo(false)}
									className="p-1 rounded-full hover:bg-white/10 transition-colors"
								></button>
							</div>

							<div className="space-y-6">
								<div className="text-center">
									<div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-purple-400/30">
										<Image
											src={selectedChat.avatar}
											alt={selectedChat.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<h3 className="text-2xl font-bold text-white mb-1">
										{selectedChat.name}
									</h3>
									<button className="text-purple-300 hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto">
										<span>от {selectedChat.author}</span>
									</button>
								</div>

								<div>
									<h4 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wide">
										Описание
									</h4>
									<p className="text-gray-300 leading-relaxed">
										{selectedChat.description}
									</p>
								</div>

								<div>
									<h4 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">
										Теги
									</h4>
									<div className="flex flex-wrap gap-2">
										{selectedChat.tags.map((tag, index) => (
											<span
												key={index}
												className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm border border-purple-400/20"
											>
												{tag}
											</span>
										))}
									</div>
								</div>

								<div className="pt-4 border-t border-white/10">
									<button
										onClick={() => {
											setShowDeleteConfirm(true);
											setShowBotInfo(false);
										}}
										className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 text-red-300 hover:text-red-200 transition-colors"
									>
										Удалить все чаты
									</button>
									<p className="text-xs text-gray-400 mt-2 text-center">
										Это действие нельзя отменить
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{showDeleteConfirm && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center"></div>
								<div>
									<h3 className="text-lg font-semibold text-white">
										Удалить все чаты?
									</h3>
									<p className="text-sm text-gray-400">
										Это действие нельзя отменить
									</p>
								</div>
							</div>

							<p className="text-gray-300 mb-6">
								Вы уверены, что хотите удалить чат с{" "}
								<span className="font-semibold text-white">
									{selectedChat.name}
								</span>
								?
							</p>

							<div className="flex gap-3">
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
								>
									Отмена
								</button>
								<button className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium">
									Удалить
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	);
};

export default Chat;
