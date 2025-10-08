import { cancelIcon } from "@/assets/images/images";
import { showAuth } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BotInfo = ({ setShowBotInfo, chatInfo }) => {
	const { selectedTheme, user } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const router = useRouter();

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
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className={`${selectedTheme.options.background} rounded-2xl p-6 w-[80vw] border border-white/10 max-h-[80vh] text-white overflow-y-auto`}
			>
				<div className="flex items-center justify-end mb-5">
					<button
						onClick={() => setShowBotInfo(false)}
						className="p-1 rounded-full hover:bg-white/10 transition-colors"
					>
						<Image
							src={cancelIcon}
							alt="cancel-icon"
							width={30}
							height={30}
						/>
					</button>
				</div>

				<div className="space-y-6">
					<div className="text-center">
						<div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-white">
							<Image
								width={100}
								height={100}
								src={chatInfo.avatar}
								alt={chatInfo.name}
								className="w-full h-full object-cover"
							/>
						</div>
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

					<div>
						<h4 className="text-sm font-semibold mb-2 uppercase tracking-wide">
							Описание
						</h4>
						<p className="text-gray-300 leading-relaxed">
							{chatInfo.description}
						</p>
					</div>

					<div>
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default BotInfo;
