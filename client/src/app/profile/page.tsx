"use client";
import useUserService from "@/api/user_service";
import { questionIcon, uploadIcon } from "@/assets/images/images";
import AvatarChange from "@/components/AvatarChange";
import DeleteConfirm from "@/components/DeleteConfirm";
import useAvatarChange from "@/hooks/avatar";
import { useWindow } from "@/hooks/window";
import { IUser } from "@/interfaces/entries";
import { openMessage } from "@/store/slices/messageSlice";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { DEFAULT_IMAGE_SRC, ROOT_URL } from "@/types/defaultImageSrc";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const window = useWindow();
	const [userDevice, setUserDevice] = useState(window);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const { readUser, deleteUser, updateUser } = useUserService();
	const { user } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const router = useRouter();

	const { selectedTheme } = useSelector((state: RootState) => state);
	const [initialData, setInitialData] = useState<IUser | null>(null);
	const [userInfo, setUserInfo] = useState<IUser | null>(null);
	const [isChange, setIsChange] = useState(false);

	async function getUserData() {
		if (!user.user?.id) return;
		try {
			const response = await readUser(user.user.id);

			if (!response) {
				throw new Error("Failed to get user data");
			}

			setInitialData(response.user);
		} catch (error) {
			console.log(error);
			dispatch(openMessage("Произошла ошибка при получении данных"));
		}
	}

	useEffect(() => {
		setUserInfo(initialData);
	}, [initialData]);

	useEffect(() => {
		getUserData();
	}, []);

	useEffect(() => {
		getUserData();
	}, [user]);

	useEffect(() => {
		setUserDevice(window);
	}, [window]);

	async function handleUpdate(e: MouseEvent) {
		e.preventDefault();
		try {
			const response = await updateUser(userInfo);
			console.log(response);

			if (!response) {
				throw new Error("Failed to update user");
			}

			setInitialData(response);
		} catch (error) {
			dispatch(openMessage("Произошла ошибка при обновлении профиля"));
		} finally {
			setIsChange(false);
		}
	}

	async function handleDelete() {
		try {
			const response = await deleteUser();

			if (!response) {
				throw new Error("Failed to delete user");
			}

			dispatch(logout(), openMessage("Профиль удалён"));
			router.replace("/");
		} catch (error) {
			setUserInfo(user.user);
			dispatch(openMessage("Произошла ошибка при удалении профиля"));
		} finally {
			setShowDeleteConfirm(false);
		}
	}

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);
	return (
		<div className="text-white/80 p-6 h-screen w-full font-sans">
			<div className="max-w-6xl pt-5 px-10 flex flex-col gap-10 h-full w-full mx-auto">
				<div className="flex justify-between items-center mb-8 w-full">
					<h1 className="text-3xl font-bold text-white/60 bg-gradient-to-r from-white to-white/70 bg-clip-text">
						Профиль
					</h1>
				</div>

				{userInfo ? (
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_3fr] md:grid-cols-1 gap-6 w-full h-full">
						<div className="lg:col-span-2 space-y-6 min-w-fit">
							<div
								className={`${selectedTheme.options.middleground} backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-100 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card`}
							>
								<div className="flex flex-col sm:flex-row items-start gap-6">
									<div className="relative group min-w-[120px] min-h-[120px] w-[120px] h-[120px]">
										{isChange ? (
											<AvatarChange
												Info={userInfo}
												setInfo={setUserInfo}
											/>
										) : (
											<Image
												src={
													userInfo.avatar ===
													DEFAULT_IMAGE_SRC
														? questionIcon
														: userInfo.avatar.startsWith(
																"http"
														  )
														? userInfo.avatar
														: ROOT_URL +
														  userInfo.avatar
												}
												alt="avatar"
												width={120}
												height={120}
												className="rounded-2xl w-full h-full border-3 border-white/30 bg-white/10 transition-all duration-500"
											/>
										)}
										<div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									</div>
									<div className="flex-1 space-y-3">
										<h2 className="text-2xl font-bold text-white break-words bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
											{userInfo.username}
										</h2>
										<p className="text-white/80 bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
											{userInfo.email}
										</p>
										<p className="text-white/60 text-sm">
											Создан:{" "}
											{new Date(
												userInfo.date_joined
											).toLocaleDateString()}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap gap-3 mt-6 pt-6 border-t-2 border-white/20">
									{isChange ? (
										<>
											<button
												onClick={(e) => handleUpdate(e)}
												className="relative overflow-hidden bg-gradient-to-r from-emerald-400/60 to-emerald-600/60 hover:from-emerald-500 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
											>
												<span className="relative z-10">
													Сохранить
												</span>
												<div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
											</button>
											<button
												onClick={() => {
													setUserInfo(initialData);
													setIsChange(false);
												}}
												className="relative overflow-hidden bg-gradient-to-r from-gray-400/60 to-gray-600/60 hover:from-gray-500 hover:to-gray-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
											>
												<span className="relative z-10">
													Отмена
												</span>
												<div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
											</button>
										</>
									) : (
										<>
											<button
												onClick={() =>
													setIsChange(true)
												}
												className="relative overflow-hidden bg-gradient-to-r from-sky-400/60 to-sky-600/60 hover:from-sky-500 hover:to-sky-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
											>
												<span className="relative z-10">
													Редактировать
												</span>
												<div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
											</button>
											<button
												className="relative overflow-hidden bg-gradient-to-r from-gray-400/60 to-gray-600/60 hover:from-gray-500 hover:to-gray-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
												onClick={() =>
													setShowDeleteConfirm(true)
												}
											>
												<span className="relative z-10">
													Удалить
												</span>
												<div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
											</button>
										</>
									)}
								</div>
							</div>

							<div
								className={`${selectedTheme.options.middleground} backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-100 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card`}
							>
								<h3 className="text-xl font-semibold text-white mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
									Имя
								</h3>
								{isChange ? (
									<textarea
										value={userInfo.username}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												username: e.target.value,
											})
										}
										className={`w-full ${selectedTheme.options.elementBackground} backdrop-blur-sm text-white rounded-2xl p-4 focus:outline-none transition-all duration-500 min-h-[80px] resize-none border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
									/>
								) : (
									<div
										className={`${selectedTheme.options.elementBackground} backdrop-blur-sm rounded-2xl p-4 min-h-[80px] border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
									>
										<p className="text-white break-words bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
											{userInfo.username}
										</p>
									</div>
								)}
							</div>
						</div>

						<div className="lg:col-span-1 w-full grow">
							<div
								className={`${selectedTheme.options.middleground} backdrop-blur-sm rounded-3xl p-6 h-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-100 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card`}
							>
								<h3 className="text-xl font-semibold text-white mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text">
									Описание
								</h3>
								{isChange ? (
									<textarea
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												description: e.target.value,
											})
										}
										value={userInfo.description}
										className={`w-full h-[90%] ${selectedTheme.options.elementBackground} backdrop-blur-sm text-white rounded-2xl p-4 focus:outline-none transition-all duration-500 min-h-[200px] resize-none border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
									/>
								) : (
									<div
										className={`${selectedTheme.options.elementBackground} backdrop-blur-sm rounded-2xl p-4 h-[95%] overflow-y-auto custom-scrollbar border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
									>
										<p className="text-white whitespace-pre-wrap bg-gradient-to-r from-white to-white/70 bg-clip-text">
											{userInfo.description}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/90 border-r-2 border-white/30"></div>
					</div>
				)}
			</div>

			{showDeleteConfirm && (
				<DeleteConfirm
					setShowDeleteConfirm={setShowDeleteConfirm}
					entity={"аккаунт"}
					del={handleDelete}
				/>
			)}
		</div>
	);
};

export default ProfilePage;
