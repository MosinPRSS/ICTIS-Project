import { cancelIcon, questionIcon } from "@/assets/images/images";
import { useWindow } from "@/hooks/window";
import { showAuth } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { DEFAULT_IMAGE_SRC } from "@/types/defaultImageSrc";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BotInfo = ({ setShowBotInfo, chatInfo }) => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const { selectedTheme, user } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	function redirectToAuthor() {
		if (!user.user) {
			dispatch(showAuth(true));
			return;
		}

		const userID = localStorage.getItem("userID");
		if (userID === chatInfo.user.id) {
			router.push("/profile");
		} else {
			router.push(`/user/${chatInfo.user.id}`);
		}
	}
	return (
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 w-full">
			<div
				className={`w-[60vw] max-h-[80vh] text-white overflow-y-auto flex ld:flex-col md:flex-row ${
					userDevice === "mobile" && "flex-col"
				} gap-5`}
			>
				<div
					className={`space-y-6 overflow-visible ${
						userDevice === "mobile" ? "w-full" : "w-[50%]"
					}`}
				>
					<motion.div
						initial={{ opacity: 0, y: -100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 100 }}
						transition={{ duration: 0.4 }}
						className={`flex flex-col justify-between items-center ${selectedTheme.options.background}  rounded-2xl p-6 border border-white/10`}
					>
						<div className="w-full flex">
							<button
								onClick={() => setShowBotInfo(false)}
								className="p-1 mb-5 rounded-full hover:bg-white/10 transition-colors self-end"
							>
								<Image
									src={cancelIcon}
									alt="cancel-icon"
									width={30}
									height={30}
								/>
							</button>
						</div>
						<div className="flex gap-5 items-center">
							<div className="w-24 h-24 flex justify-center items-center rounded-full mb-4 overflow-hidden ring-4 ring-white">
								<Image
									src={
										chatInfo.avatar === DEFAULT_IMAGE_SRC
											? questionIcon
											: chatInfo.avatar
									}
									alt={chatInfo.name}
									className="w-full h-full rounded-full object-cover"
									width={40}
									height={40}
								/>
							</div>
							<div className="text-end">
								<h3 className="text-2xl font-bold mb-1">
									{chatInfo.name}
								</h3>
								<button
									onClick={redirectToAuthor}
									className="hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
								>
									<span>от {chatInfo.user.username}</span>
								</button>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.4 }}
						className={`text-center ${selectedTheme.options.background} rounded-2xl p-6 border border-white/10`}
					>
						<h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">
							Теги
						</h4>
						<div className="flex flex-wrap gap-2">
							{chatInfo.tags.map((tag, index) => (
								<span
									key={index}
									className={`px-3 py-1 rounded-full ${selectedTheme.options.middleground} text-sm border`}
								>
									{tag}
								</span>
							))}
						</div>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 1, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 1, x: 100 }}
					transition={{ duration: 0.4 }}
					className={`${selectedTheme.options.background} ${
						userDevice === "mobile" ? "w-full" : "w-[50%]"
					} rounded-2xl p-6 border border-white/10`}
				>
					<h4 className="text-sm font-semibold mb-2 uppercase tracking-wide">
						Описание
					</h4>
					<p className="text-gray-300 leading-relaxed">
						{chatInfo.description}
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default BotInfo;
