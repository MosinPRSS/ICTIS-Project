"use client";
import useUserService from "@/api/user_service";
import { BotCard } from "@/components/mainPage/BotCards";
import { useWindow } from "@/hooks/window";
import { IUser } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const { readUser, updateUser, deleteUser } = useUserService();
	const { user } = useSelector((state: RootState) => state);

	const { selectedTheme } = useSelector((state: RootState) => state);
	const [userInfo, setUserInfo] = useState<IUser | null>(null);
	const [isChange, setIsChange] = useState(false);

	useEffect(() => {
		(async function getUserData() {
			if (!user.user?.id) return;

			const response = await readUser(user.user.id);
			console.log(response);

			setUserInfo(response);
		})();
	}, [user]);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	function handleDelete() {
		deleteUser();
	}

	return (
		<div
			className={`text-white p-10 h-[100vh] w-full flex flex-col justify-between`}
		>
			<h1 className="text-4xl">Профиль</h1>
			{userInfo ? (
				<div
					className={`${
						userDevice === "mobile" ? "flex-col" : "h-[90%]"
					} flex justify-between items-center w-full gap-10 grow p-10 pb-0`}
				>
					<div
						className={`${selectedTheme.options.elementBackground} w-full h-full overflow-y-auto  border-1 rounded-[10px] p-10 flex flex-col justify-between gap-10`}
					>
						<div className="flex gap-5 items-center">
							<div
								className={`${selectedTheme.options.border} border-[1px] rounded-full bg-black min-w-40 min-h-40`}
							></div>
							<div>
								<p>{userInfo.username}</p>
								<p>{userInfo.email}</p>
								<p className="break-words">
									Создан:
									{new Date(
										userInfo.date_joined
									).toLocaleDateString()}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-3 h-[60%] overflow-y-auto grow">
							<p>Описание</p>
							{isChange ? (
								<textarea
									className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
								/>
							) : (
								<p
									className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
								>
									{userInfo.description}
								</p>
							)}
						</div>
						<div className="flex justify-between items-center">
							{isChange ? (
								<>
									<button
										onClick={() => setIsChange(false)}
										className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
									>
										Сохранить
									</button>
									<button
										onClick={() => setIsChange(false)}
										className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
									>
										Отмена
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => setIsChange(true)}
										className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
									>
										Редактировать
									</button>
									<button
										className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
										onClick={() =>
											setShowDeleteConfirm(true)
										}
									>
										Удалить
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center"></div>
							<div>
								<h3 className="text-lg font-semibold text-white">
									Удалить аккаунт?
								</h3>
								<p className="text-sm text-gray-400">
									Это действие нельзя отменить
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => setShowDeleteConfirm(false)}
								className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
							>
								Отмена
							</button>
							<button
								className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
								onClick={() => handleDelete()}
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
