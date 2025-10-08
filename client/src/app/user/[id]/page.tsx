"use client";
import useUserService from "@/api/user_service";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import { useWindow } from "@/hooks/window";
import { RootState } from "@reduxjs/toolkit/query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const router = useRouter();

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

	function redirect(id: string) {
		router.push(`/bot/${id}`);
	}

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
					} flex justify-between items-center h-full w-full gap-10 grow p-10 pb-0`}
				>
					<div
						className={`${
							userDevice === "mobile"
								? "w-full min-h-fit h-fit"
								: "w-[50%] h-full overflow-y-auto"
						} flex flex-col gap-10`}
					>
						<div
							className={`flex gap-5 items-center ${selectedTheme.options.elementBackground} p-10 border-1 ${selectedTheme.options.border} rounded-[10px]`}
						>
							<div
								className={`${selectedTheme.options.border} border-[1px] rounded-full bg-black min-w-40 min-h-40`}
							></div>
							<div>
								<p>{userInfo.user.username}</p>
								<p>{userInfo.user.email}</p>
								<p className="break-words">
									Создан:
									{new Date(
										userInfo.user.date_joined
									).toLocaleDateString()}
								</p>
							</div>
						</div>
						<div
							className={`flex flex-col gap-3 h-fit overflow-y-auto ${selectedTheme.options.elementBackground} p-10 border-1 ${selectedTheme.options.border} rounded-[10px]`}
						>
							<p>Имя</p>
							<p
								className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
							>
								{userInfo.user.username}
							</p>
						</div>
						<div
							className={`flex flex-col gap-3 h-fit overflow-y-auto ${selectedTheme.options.elementBackground} p-10 border-1 ${selectedTheme.options.border} rounded-[10px]`}
						>
							<p>Описание</p>
							<p
								className={`overflow-y-auto ${selectedTheme.options.background} rounded-[10px] p-5`}
							>
								{userInfo.description}
							</p>
						</div>
					</div>
					<div
						className={`flex justify-end flex-wrap gap-3 ${
							userDevice == "mobile"
								? ""
								: "w-[50%] h-full overflow-y-scroll"
						}`}
					>
						{userInfo.bots &&
							userInfo.bots.length !== 0 &&
							userInfo.bots.map((bot) => (
								<Card
									entity={bot}
									key={bot.id}
									fun={redirect}
									arg={bot.id}
								/>
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
