"use client";
import useUserService from "@/api/user_service";
import DeleteConfirm from "@/components/DeleteConfirm";
import { useWindow } from "@/hooks/window";
import { IUser } from "@/interfaces/interfaces";
import { openMessage } from "@/store/slices/messageSlice";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
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
	}, [user]);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

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
							<p>Имя</p>
							{isChange ? (
								<textarea
									value={userInfo.username}
									onChange={(e) =>
										setUserInfo({
											...userInfo,
											username: e.target.value,
										})
									}
									className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
								/>
							) : (
								<p
									className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
								>
									{userInfo.username}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-3 h-[60%] overflow-y-auto grow">
							<p>Описание</p>
							{isChange ? (
								<textarea
									onChange={(e) =>
										setUserInfo({
											...userInfo,
											description: e.target.value,
										})
									}
									value={userInfo.description}
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
