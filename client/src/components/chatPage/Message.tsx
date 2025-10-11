import {
	clockIcon,
	errorIcon,
	editIcon,
	okIcon,
	closeIcon,
	copyIcon,
	deleteIcon,
} from "@/assets/images/images";
import React from "react";
import Image from "next/image";
import { IMessage } from "@/interfaces/chat";
import useMessageService from "@/api/message_service";
import { openMessage } from "@/store/slices/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "motion/react";

const Message = ({
	message,
	userDevice,
	setMessages,
}: {
	message: IMessage;
	userDevice: string;
	setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const { deleteMessage, updateMessage } = useMessageService();
	const [isEditing, setIsEditing] = React.useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
	const [newMessage, setNewMessage] = React.useState(message.content);
	const [isCopied, setIsCopied] = React.useState(false);
	const dispatch = useDispatch();

	async function handleUpdate(e) {
		e.preventDefault();
		try {
			const response = await updateMessage(message.id, newMessage);

			if (!response) {
				throw new Error("Failed to update message");
			}

			setMessages((prev) =>
				prev.filter((m) => m.timestamp <= message.timestamp)
			);
			setMessages((prev) => [...prev, response]);
		} catch (error) {
			dispatch(
				openMessage("Произошла ошибка при редактировании сообщения")
			);
			console.log(error);
		} finally {
			setIsEditing(false);
		}
	}

	async function handleDelete(e, message) {
		e.preventDefault();
		try {
			if (message.status === "send") {
				const response = await deleteMessage(message.id);

				if (response !== 204) {
					throw new Error("Failed to delete message");
				}
			}

			setMessages((prev) =>
				prev.filter(
					(mes) =>
						mes.id !== message.id &&
						mes.timestamp <= message.timestamp
				)
			);
		} catch (error) {
			dispatch(openMessage("Произошла ошибка при удалении сообщения"));
			console.log(error);
		}
	}

	const copyBtnRef = React.useRef<HTMLButtonElement>(null);

	function handleCopy() {
		navigator.clipboard.writeText(message.content);
		copyBtnRef.current.disabled = true;
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
			copyBtnRef.current.disabled = false;
		}, 3000);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 100 }}
			transition={{ duration: 0.4, type: "spring" }}
			key={message.id}
			className={`flex ${
				message.role !== "user" ? "justify-start" : "justify-end mb-15"
			}`}
		>
			<div
				className={`relative ${
					userDevice === "mobile" ? "w-[90%]" : "w-[45%]"
				} break-words px-4 py-3 rounded-2xl ${
					message.role !== "user"
						? "bg-white/10 text-white"
						: `${selectedTheme.options.elementBackground} text-white`
				}`}
			>
				{message.role === "user" && isEditing ? (
					<>
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							className="w-full p-1 rounded-[5px] focus:ring-2 focus:ring-violet-600"
						/>
						<div className="absolute bottom-[-2rem] right-2 flex gap-3">
							<button
								className="p-[3px] hover:bg-gray-400 rounded-[5px]"
								onClick={() => setIsEditing(false)}
							>
								<Image
									src={closeIcon}
									alt="close-icon"
									width={20}
									height={20}
								/>
							</button>
							<button
								className="p-[3px] hover:bg-gray-400 rounded-[5px]"
								onClick={(e) => handleUpdate(e)}
							>
								<Image
									src={okIcon}
									alt="ok-icon"
									width={20}
									height={20}
								/>
							</button>
						</div>
					</>
				) : (
					<>
						<p className="text-sm">{message.content}</p>
						<p className="text-xs opacity-70 mt-1 text-right">
							{new Date(message.timestamp).toLocaleTimeString()}
						</p>
						<div
							className={`absolute bottom-[-5px] p-0 left-[-5px] w-5 h-5 rounded-full ${
								message.status === "error" && "bg-red-500"
							}`}
						>
							{message.status === "pending" ? (
								<Image
									src={clockIcon}
									alt="clock-icon"
									width={30}
									height={30}
								/>
							) : (
								message.status === "error" && (
									<Image
										src={errorIcon}
										alt="error-icon"
										width={30}
										height={30}
									/>
								)
							)}
						</div>
						<div
							className={`absolute bottom-[-1.8rem] right-2 flex gap-2 p-[2px] rounded-[5px] ${
								message.role !== "user"
									? "bg-white/10 text-white"
									: `${selectedTheme.options.elementOpacity} text-white`
							}`}
						>
							<button
								className="p-[3px] hover:bg-gray-400 rounded-[5px]"
								onClick={() => handleCopy()}
								ref={copyBtnRef}
							>
								<Image
									src={isCopied ? okIcon : copyIcon}
									alt="copy-icon"
									width={20}
									height={20}
								/>
							</button>
							{message.role === "user" && (
								<>
									<button
										className="p-[3px] hover:bg-gray-400 rounded-[5px]"
										onClick={() => setIsEditing(true)}
									>
										<Image
											src={editIcon}
											alt="edit-icon"
											width={20}
											height={20}
										/>
									</button>
									<button
										className="p-[3px] hover:bg-gray-400 rounded-[5px]"
										onClick={() =>
											setShowDeleteConfirm(true)
										}
									>
										<Image
											src={deleteIcon}
											alt="delete-icon"
											width={20}
											height={20}
										/>
									</button>
								</>
							)}
						</div>
					</>
				)}
				{showDeleteConfirm && (
					<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
							<p className="text-gray-300 mb-6">
								Вы уверены, что хотите удалить сообщение?
							</p>

							<div className="flex gap-3">
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
								>
									Отмена
								</button>
								<button
									onClick={(e) => handleDelete(e, message)}
									className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
								>
									Удалить
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Message;
