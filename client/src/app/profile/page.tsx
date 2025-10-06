"use client";
import useUserService from "@/api/user_service";
import DeleteConfirm from "@/components/DeleteConfirm";
import { useWindow, useWindowWidth } from "@/hooks/window";
import { IUser } from "@/interfaces/entries";
import { openMessage } from "@/store/slices/messageSlice";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const window = useWindow();
	const windowWidth = useWindowWidth();
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
			console.log(response);

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
			console.log(response);
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

	return (
		<div
			className={`text-white p-10 h-[100vh] w-full flex flex-col justify-between`}
		>
			<h1 className="text-4xl">Профиль</h1>
			{userInfo ? (
				<div
					className={`${
						userDevice === "mobile" ? "flex-col" : "h-[90%]"
					} flex justify-between items-center w-full gap-10 grow pt-15 pl-10 pb-0`}
				>
					<div
						className={`relative w-full h-full flex flex-wrap justify-center gap-10`}
					>
						<div
							className={`flex flex-col ${
								userDevice === "mobile"
									? "w-full"
									: "min-w-fit w-[45%]"
							} gap-10`}
						>
							<div
								className={`${selectedTheme.options.elementBackground} border-1 rounded-[10px] p-10 h-fit flex flex-col gap-10`}
							>
								<div className="flex gap-5">
									<Image
										src={userInfo.avatar}
										alt="avatar"
										width={100}
										height={100}
										className={`${selectedTheme.options.border} text-2xl border-[1px] rounded-[15px] min-w-40 min-h-40`}
									/>
									<div className="pt-5 h-fit w-[67%]">
										<p className="break-words word-break-break-all overflow-hidden">
											{userInfo.username}
										</p>
										<p>{userInfo.email}</p>
										<p className="break-words">
											Создан:
											{new Date(
												userInfo.date_joined
											).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className="gap-5 flex justify-between items-center">
									{isChange ? (
										<>
											<button
												onClick={(e) => handleUpdate(e)}
												className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
											>
												Сохранить
											</button>
											<button
												onClick={() => {
													setUserInfo(initialData);
													setIsChange(false);
												}}
												className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
											>
												Отмена
											</button>
										</>
									) : (
										<>
											<button
												onClick={() =>
													setIsChange(true)
												}
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
							<div
								className={`flex flex-col gap-5 h-fit max-h-[50%] overflow-y-auto ${selectedTheme.options.elementBackground} border-1 rounded-[10px] p-10 `}
							>
								<p className="text-2xl">Имя</p>
								{isChange ? (
									<textarea
										value={userInfo.username}
										onChange={(e) =>
											setUserInfo({
												...userInfo,
												username: e.target.value,
											})
										}
										className={`h-fit ${selectedTheme.options.background} rounded-[10px] p-5`}
									/>
								) : (
									<p
										className={`w-full overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
									>
										{userInfo.username}
									</p>
								)}
							</div>
						</div>
						<div
							className={`flex flex-col gap-5 h-[90%] overflow-y-auto ${
								selectedTheme.options.elementBackground
							} border-1 rounded-[10px] p-10 ${
								userDevice === "mobile"
									? "w-full"
									: "min-w-fit w-[45%]"
							}`}
						>
							<p className="text-2xl">Описание</p>
							{isChange ? (
								<textarea
									onChange={(e) =>
										setUserInfo({
											...userInfo,
											description: e.target.value,
										})
									}
									value={userInfo.description}
									className={`h-full ${selectedTheme.options.background} rounded-[10px] p-5`}
								/>
							) : (
								<p
									className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5 h-full`}
								>
									{userInfo.description}
								</p>
							)}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
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
