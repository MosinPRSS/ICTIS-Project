"use client";
import { useEffect, useState } from "react";
import {
	Logo,
	collapseIcon,
	ExitIcon,
	QuestionIcon,
	ThemesIcon,
	BotIcon,
	PersonaIcon,
	ChatIcon,
} from "../assets/images/images";
import { motion } from "motion/react";
import ThemesList from "./ThemesList";
import Image from "next/image";
import { useWindow } from "@/hooks/window";
import Auth from "@/components/sidebar/Auth";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { auth, logout, showAuth } from "@/store/slices/userSlice";
import { logoutApi } from "@/api/token_service";
import { useRouter } from "next/navigation";
import { DEFAULT_IMAGE_SRC, ROOT_URL } from "@/types/defaultImageSrc";
import { setTheme } from "@/store/slices/themeSlice";

const Sidebar = () => {
	const windowWidth = useWindow();
	const { selectedTheme, user } = useSelector((state: RootState) => state);

	const [userDevice, setUserDevice] = useState(windowWidth);
	const [isCollapsed, setCollapse] = useState(true);
	const [openThemes, setOpenThemes] = useState(false);

	useEffect(() => {
		const userID = localStorage.getItem("userID");
		const username = localStorage.getItem("username");
		const avatarUrl = localStorage.getItem("avatarUrl");
		const theme = localStorage.getItem("theme");

		const data = {
			name: username,
			id: userID,
			avatarUrl: avatarUrl,
		};

		if (userID && username && avatarUrl) {
			dispatch(auth(data), setTheme(JSON.parse(theme)));
		}
	}, []);

	function collapse() {
		setCollapse((isCollapsed) => !isCollapsed);
	}

	useEffect(() => {
		setUserDevice(windowWidth);
		setCollapse(windowWidth === "mobile");
	}, [windowWidth]);

	const dispatch = useDispatch();

	function logOut(event: MouseEvent) {
		event.preventDefault();
		logoutApi();
		dispatch(logout());
		router.replace("/");
	}

	const router = useRouter();
	function redirect(e: MouseEvent, href: string) {
		e.preventDefault();
		if (!user.user) {
			dispatch(showAuth(true));
			return;
		}

		checkDevice(e, href);
	}

	function checkDevice(e: MouseEvent, href: string) {
		e.preventDefault();
		if (userDevice === "mobile") {
			setCollapse(true);
		}
		router.push(href);
	}

	return (
		<>
			<motion.div
				className={`flex justify-between flex-col h-[100vh] ${
					userDevice === "mobile"
						? "fixed w-[100vw]"
						: "relative w-[15rem]"
				} ${
					selectedTheme.options.middleground
				} border-r-[3px] border-white p-[10px] z-999 duration-100 sidebar-transition overflow-x-hidden`}
				animate={
					userDevice === "mobile"
						? isCollapsed
							? {
									width: 0,
									padding: 0,
							  }
							: {
									width: "100%",
							  }
						: isCollapsed
						? {
								width: 0,
								padding: 0,
						  }
						: {
								width: "15rem",
						  }
				}
			>
				<div>
					<button
						onClick={(e) => checkDevice(e, "/")}
						className={`overflow-x-hidden w-full relative group text-white rounded-[10px] p-[10px] flex items-center space-x-1`}
					>
						<Image
							src={Logo}
							alt="ari-logo"
							width={30}
							height={30}
							className="group-hover:scale-110 z-10 group-hover:rotate-[180deg] transition-all duration-350 ease-in-out"
						/>

						<h1
							className={`text-3xl z-10 font-extrabold mt-0.5 whitespace-nowrap transition-all group-hover:text-black duration-350 ease-in-out`}
							id="logo"
						>
							ARI-ai
						</h1>
						<div className="absolute z-0 inset-0 bg-white rounded-b-xl transition-all duration-350 ease-in-out h-0 w-full group-hover:h-full"></div>
					</button>

					<div className={`flex flex-col p-1 pt-5 space-y-1`}>
						<button
							onClick={(e) => redirect(e, "/mybots")}
							className={`w-full group relative hover:text-black duration-350 ease-in-out flex items-center text-white transition p-3 space-x-2 rounded-xs`}
						>
							<BotIcon />
							<p className={`whitespace-nowrap z-1`}>
								Редактор ботов
							</p>
							<div className="absolute z-0 rounded-r-[10px] inset-0 w-0 bg-white transition-all duration-350 ease-in-out group-hover:w-full" />
						</button>
						<button
							onClick={(e) => redirect(e, "/mypersonas")}
							className={`w-full group relative hover:text-black duration-350 ease-in-out flex items-center text-white transition p-3 space-x-2 rounded-xs`}
						>
							<PersonaIcon />
							<p className={`whitespace-nowrap z-1`}>
								Редактор персон
							</p>
							<div className="absolute z-0 rounded-r-[10px] inset-0 w-0 bg-white transition-all duration-350 ease-in-out group-hover:w-full" />
						</button>
						<button
							onClick={(e) => redirect(e, "/chats")}
							className={`w-full group relative hover:text-black duration-350 ease-in-out flex items-center text-white transition p-3 space-x-2 rounded-xs`}
						>
							<ChatIcon />
							<p className={`whitespace-nowrap z-1`}>Чаты</p>
							<div className="absolute z-0 rounded-r-[10px] inset-0 w-0 bg-white transition-all duration-350 ease-in-out group-hover:w-full" />
						</button>
					</div>
				</div>

				<button
					className={` collaps-btn cursor-pointer z-999 bg-white rounded-full flex justify-center items-center fixed ${
						userDevice === "mobile"
							? `opacity-50 w-[3rem] h-[3rem] top-[1rem] ${
									!isCollapsed
										? "right-[1rem]"
										: "right-[1rem]"
							  }`
							: "w-[2rem] h-[3rem] top-[45%] left-[1rem]"
					}`}
					onClick={() => {
						collapse();
					}}
				>
					<motion.div
						animate={
							isCollapsed
								? {
										rotate: 180,
								  }
								: {
										rotate: 0,
								  }
						}
					>
						<Image
							className={`${
								userDevice === "mobile" && "w-20 h-20"
							}`}
							src={collapseIcon}
							alt="collapse-icon"
							width={30}
							height={30}
							style={{ minWidth: 30 + "px" }}
						/>
					</motion.div>
				</button>

				<div className={`flex flex-col space-y-1 relative`}>
					<button
						onClick={() =>
							setOpenThemes((openThemes) => !openThemes)
						}
						className={`w-full group relative hover:text-black duration-350 ease-in-out flex items-center text-white transition p-3 space-x-2 rounded-xs`}
					>
						<ThemesIcon />
						<p className={`whitespace-nowrap z-1`}>Темы</p>
						<div className="absolute z-0 rounded-r-[10px] inset-0 w-0 bg-white transition-all duration-350 ease-in-out group-hover:w-full" />
					</button>
					<ThemesList isOpen={openThemes} setOpen={setOpenThemes} />
					<button
						onClick={(e) => redirect(e, "/profile")}
						className={`w-full group relative hover:text-black duration-350 ease-in-out flex items-center text-white transition p-3 space-x-2 rounded-xs`}
					>
						<QuestionIcon />
						<p className={`whitespace-nowrap z-1`}>Нужна помощь?</p>
						<div className="absolute z-0 rounded-r-[10px] inset-0 w-0 bg-white transition-all duration-350 ease-in-out group-hover:w-full" />
					</button>

					<div
						className={`text-white rounded-[10px] p-[10px] flex items-center justify-between space-x-1 overflow-x-hidden`}
					>
						{user.user ? (
							<>
								<div className="max-w-[85%] hover:bg-amber-50 rounded-[5px]">
									<button
										onClick={(e) => redirect(e, "/profile")}
										className="max-w-[100%] hover:bg-white hover:text-black flex grow items-center space-x-2 pr-2 rounded-xs"
									>
										{user.user.avatarUrl && (
											<Image
												src={
													!user.user.avatarUrl ||
													user.user.avatarUrl ===
														DEFAULT_IMAGE_SRC
														? personIcon
														: user.user.avatarUrl.startsWith(
																"http://"
														  ) ||
														  user.user.avatarUrl.startsWith(
																"https://"
														  )
														? user.user.avatarUrl
														: ROOT_URL +
														  user.user.avatarUrl
												}
												alt="avatar"
												width={50}
												height={50}
												className="rounded-[5px]"
											/>
										)}
										<p
											className={`whitespace-nowrap overflow-x-hidden`}
										>
											{user.user.name}
										</p>
									</button>
								</div>
								<button
									className="hover:bg-white group hover:text-black rounded-xs min-w-[20px] min-h-[20px]"
									onClick={(e) => logOut(e)}
								>
									<ExitIcon />
								</button>
							</>
						) : (
							<>
								<p className="whitespace-nowrap">Гость</p>
								<button
									className="hover:bg-white group hover:text-black rounded-xs min-w-[20px] min-h-[20px]"
									onClick={() => dispatch(showAuth(true))}
								>
									<ExitIcon />
								</button>
							</>
						)}
					</div>
				</div>
			</motion.div>
			{!user.user && user.isAuth && <Auth />}
		</>
	);
};

export default Sidebar;
