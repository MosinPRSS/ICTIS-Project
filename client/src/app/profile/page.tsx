"use client";
import useUserService from "@/api/user_service";
import DeleteConfirm from "@/components/DeleteConfirm";
import { useWindow } from "@/hooks/window";
import { IUser } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const { readUser, deleteUser } = useUserService();
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

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

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
										onClick={() => setIsChange(false)}
										className="border-[1px] rounded-[10px] p-3 hover:bg-white hover:text-black"
									>
										Сохранить
									</button>
									<button
										onClick={() => {
											setUserInfo(user.user);
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
