"use client";
import useUserService from "@/api/user_service";
import Loading from "@/components/Loading";
import { BotCard } from "@/components/mainPage/BotCards";
import { useWindow } from "@/hooks/window";
import { RootState } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);

	const [userInfo, setUserInfo] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const { readUser } = useUserService();
	const userId = useParams();

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		(async function getUserData() {
			setLoading(true);
			try {
				const response = await readUser(userId.id);
				console.log(response);

				if (!response) {
					throw new Error("Failed to get user data");
				}
				setUserInfo(response);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div
			className={`text-white p-10 h-[100vh] w-full flex flex-col justify-between`}
		>
			{isLoading ? (
				<Loading />
			) : userInfo ? (
				<div
					className={`${
						userDevice === "mobile" && "flex-col"
					} flex justify-between items-center w-full gap-10 grow p-10 pb-0`}
				>
					<div
						className={`${
							selectedTheme.options.elementBackground
						} ${
							userDevice === "mobile"
								? "w-full"
								: "w-[50%] h-full"
						} overflow-y-auto  border-1 rounded-[10px] p-10 flex flex-col justify-between gap-10`}
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
							<p
								className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
							>
								{userInfo.username}
							</p>
						</div>
						<div className="flex flex-col gap-3 h-[60%] overflow-y-auto grow">
							<p>Описание</p>
							<p
								className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
							>
								{userInfo.description}
							</p>
						</div>
					</div>
					<div
						className={`${
							userDevice == "mobile" ? "" : "w-[50%] h-full"
						}`}
					>
						{userInfo.userbots &&
							userInfo.userbots.length !== 0 &&
							userInfo.userbots.map((bot) => (
								<BotCard bot={bot} key={bot.id} />
							))}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default UserPage;
