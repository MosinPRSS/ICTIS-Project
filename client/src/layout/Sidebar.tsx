"use client";
import { useEffect, useState } from "react";
import {
	Logo,
	donutIcon,
	collapseIcon,
	questionIcon,
	exitIcon,
} from "../assets/images/images";
import { motion } from "motion/react";
import ThemesList from "./ThemesList";
import Image from "next/image";
import { useWindow } from "@/hooks/window";
import { navButtons } from "@/components/sidebar/navButtons";
import Auth from "@/components/sidebar/Auth";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { auth, logout, showAuth } from "@/store/slices/userSlice";
import { logoutApi } from "@/api/token_service";
import { useRouter } from "next/navigation";
import useBotService from "@/api/bot_service";
import usePersonaService from "@/api/persona_service";
import useUserService from "@/api/user_service";

const Sidebar = () => {
	const windowWidth = useWindow();
	const { selectedTheme, user } = useSelector((state: RootState) => state);

	const [userDevice, setUserDevice] = useState(windowWidth);
	const [isCollapsed, setCollapse] = useState(true);
	const [openThemes, setOpenThemes] = useState(false);

	const { readUser } = useUserService();
	const { listBot } = useBotService();
	const { listPersonas } = usePersonaService();

	// useEffect(() => {
	// 	(async function getUserData() {
	// 		const user = localStorage.getItem("userID");

	// 		if (!user) {
	// 			return;
	// 		}

	// 		const userResponse = await readUser(user);
	// 		const botsResponse = await listBot("b/list/user");
	// 		const personasResponse = await listPersonas();

	// 		if (!botsResponse || !personasResponse || !userResponse) {
	// 			return;
	// 		}

	// 		dispatch(
	// 			initUserBots(botsResponse),
	// 			initUserPersonas(personasResponse),
	// 			auth(userResponse)
	// 		);

	// 		return;
	// 	})();
	// }, []);

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

	useEffect(() => {
		const username = localStorage.getItem("username");
		const userID = localStorage.getItem("userID");

		if (!username || !userID) return;

		dispatch(
			auth({
				name: username,
				id: userID,
			})
		);
	}, []);

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
						className={`overflow-x-hidden w-full justify-center text-white rounded-[10px] p-[10px] flex items-center space-x-1`}
					>
						<Image
							src={Logo}
							alt="ari-logo"
							width={30}
							height={30}
						/>

						<h1
							className={`text-3xl font-extrabold mt-0.5 whitespace-nowrap`}
							id="logo"
						>
							ARI-ai
						</h1>
					</button>

					<div className={`flex flex-col p-1 pt-5 space-y-1`}>
						{navButtons.map((button) => (
							<button
								key={button.name}
								onClick={(e) => redirect(e, button.href)}
								className={`w-full hover:bg-white hover:text-black flex items-center text-white transition duration-10 p-3 space-x-1 rounded-xs`}
							>
								<Image
									src={button.icon}
									alt={`${button.name}-icon`}
									width={30}
									height={30}
								/>
								<p className={`whitespace-nowrap`}>
									{button.desc}
								</p>
							</button>
						))}
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
						className="w-full hover:bg-white hover:text-black flex text-white space-x-1 rounded-xs p-3"
					>
						<Image
							src={donutIcon}
							alt="donut-icon"
							width={20}
							height={20}
							style={{ minWidth: 30 + "px" }}
						/>
						<p className={`whitespace-nowrap`}>Темы</p>
					</button>
					<ThemesList isOpen={openThemes} setOpen={setOpenThemes} />
					<Link href="/help">
						<button className="w-full hover:bg-white hover:text-black flex text-white space-x-1 rounded-xs p-3">
							<Image
								src={questionIcon}
								alt="question-icon"
								width={20}
								height={20}
								style={{ minWidth: 30 + "px" }}
							/>
							<p className={`whitespace-nowrap`}>Нужна помощь?</p>
						</button>
					</Link>
					<div
						className={`text-white rounded-[10px] p-[10px] flex items-center justify-between space-x-1 overflow-x-hidden`}
					>
						{user.user ? (
							<>
								<div className="max-w-[85%] hover:bg-amber-50">
									<button
										onClick={(e) => redirect(e, "/profile")}
										className="max-w-[100%] hover:bg-white hover:text-black flex grow items-center space-x-2 pr-2 rounded-xs"
									>
										<div className="h-[2.5rem] w-[2.5rem] border-[1px] rounded-[6px] border-white"></div>
										<p
											className={`whitespace-nowrap overflow-x-hidden`}
										>
											{user.user.name}
										</p>
									</button>
								</div>
								<button
									className="hover:bg-white hover:text-black rounded-xs min-w-[20px] min-h-[20px]"
									onClick={(e) => logOut(e)}
								>
									<Image
										src={exitIcon}
										alt="exit-icon"
										width={20}
										height={20}
									/>
								</button>
							</>
						) : (
							<>
								<p className="whitespace-nowrap">Гость</p>
								<button
									className="hover:bg-white hover:text-black rounded-xs min-w-[20px] min-h-[20px]"
									onClick={() => dispatch(showAuth(true))}
								>
									<Image
										src={exitIcon}
										alt="exit-icon"
										width={20}
										height={20}
									/>
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
