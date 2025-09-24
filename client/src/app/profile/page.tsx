"use client";
import { useWindow } from "@/hooks/window";
import { IUser } from "@/interfaces/interfaces";
import { getUser } from "@/services/getUser";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);

	const { selectedTheme } = useSelector((state: RootState) => state);
	const [user, setUser] = useState<IUser | null>(null);
	const [isChange, setIsChange] = useState(false);

	async function getData() {
		try {
			const data = await getUser();
			setUser(data);
		} catch (error) {
			setUser(null);
			console.log(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	return (
		<div
			className={`text-white p-10 h-[100vh] w-full flex flex-col justify-between`}
		>
			<h1 className="text-4xl">Профиль</h1>
			{user ? (
				<div
					className={`${
						userDevice === "mobile" ? "flex-col" : "h-[90%]"
					} flex justify-between items-center w-full gap-10 grow p-10 pb-0`}
				>
					<div
						className={`${selectedTheme.options.elementBackground} h-full overflow-y-auto min-w-[410px] w-[35%] border-1 rounded-[10px] p-10 flex flex-col justify-between gap-10`}
					>
						<div className="flex gap-5 items-center">
							<div
								className={`${selectedTheme.options.border} border-[1px] rounded-full bg-black min-w-40 min-h-40`}
							></div>
							<div>
								<p>{user.name}</p>
								<p>{user.email}</p>
								<p>{user.createDate}</p>
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
									{user.description}
								</p>
							)}
						</div>
						<div className="flex justify-between items-center">
							{isChange ? (
								<>
									<button
										onClick={() => setIsChange(false)}
										className="border-[1px] rounded-[10px] p-3"
									>
										Сохранить
									</button>
									<button
										onClick={() => setIsChange(false)}
										className="border-[1px] rounded-[10px] p-3"
									>
										Отмена
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => setIsChange(true)}
										className="border-[1px] rounded-[10px] p-3"
									>
										Редактировать
									</button>
									<button className="border-[1px] rounded-[10px] p-3">
										Удалить
									</button>
								</>
							)}
						</div>
					</div>
					<div className="flex grow w-[60%] h-full flex-wrap gap-10">
						{user.bots.map((bot) => (
							<BotCard key={bot.id} bot={bot} />
						))}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default ProfilePage;
