import useSessionService from "@/api/session_service";
import { setSelectedChat } from "@/store/slices/chatsSlice";
import { openMessage } from "@/store/slices/messageSlice";
import router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteConfirm = ({ setShowDeleteConfirm, chatInfo, params }) => {
	const { deleteSession } = useSessionService();
	const dispatch = useDispatch();
	async function deleteChat(e: MouseEvent) {
		e.preventDefault();

		try {
			const response = await deleteSession(params.id);

			if (response !== 204) {
				throw new Error("Failed to delete chat");
			}

			sessionStorage.removeItem("chatInfo");
			dispatch(setSelectedChat(null), openMessage("Чат успешно удален"));
			router.push("/chats");
		} catch (error) {
			dispatch(openMessage("Произошла ошибка при удалении чата"));
			console.log(error);
		} finally {
			setShowDeleteConfirm(false);
		}
	}
	return (
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
					Вы уверены, что хотите удалить все чаты с{" "}
					{chatInfo.chatbot.name}
					<span className="font-semibold text-white">
						{chatInfo.name}
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
					<button
						onClick={(e) => deleteChat(e)}
						className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirm;
