import { IBot, ISelectedBot } from "@/interfaces/entries";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { addIcon, closeIcon, uploadIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useWindow } from "@/hooks/window";
import useBotService from "@/api/bot_service";
import { openMessage } from "@/store/slices/messageSlice";
const newBot: IBot = {
	id: 0,
	name: "Новый бот",
	chatname: "Новый бот",
	description: "Описание",
	public_description: "Публичное описание",
	scenario: "Сценарий",
	first_message: "Первое сообщение",
	avatar: "https://via.placeholder.com/150",
	tags: [],
};

const NewBotSettings = ({ setSelectedBot, updateBotsList }: ISelectedBot) => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const { createBot } = useBotService();

	const [botInfo, setBotInfo] = useState(newBot);
	const { selectedTheme } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		setBotInfo(newBot);
	}, [newBot]);

	function changeBot(updatedBot: IBot) {
		setBotInfo(updatedBot);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	function removeTag(tag: string) {
		setBotInfo({
			...botInfo,
			tags: botInfo.tags.filter((t: string) => t !== tag),
		});
	}

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	const [adding, setAdding] = useState(false);
	const [newTag, setNewTag] = useState("");

	const handleAdd = () => {
		if (newTag.trim()) {
			setBotInfo({
				...botInfo,
				tags: [...botInfo.tags, newTag.trim()],
			});
			setNewTag("");
			setAdding(false);
		}
	};

	async function saveBot(e: MouseEvent) {
		e.preventDefault();
		try {
			setBotInfo({
				...botInfo,
				id: new Date(),
			});

			const response = await createBot(botInfo);

			if (!response) {
				throw new Error("Failed to create bot");
			}

			await updateBotsList();
			dispatch(openMessage("Бот успешно создан"));
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
			console.log(error);
		} finally {
			setSelectedBot(null);
		}
	}

	return (
		<div className="absolute inset-0 min-h-screen backdrop-blur-3xl flex items-center justify-center">
			{/* Modal Container */}
			<div className="w-[90%] h-[90%] relative">
				{/* Background Glow */}
				<div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>

				{/* Modal */}
				<div className="w-full h-fit relative bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-white/10">
						<div className="flex items-center gap-3">
							{/* <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
								<Edit3 className="w-6 h-6 text-white" />
							</div> */}
							<h1 className="text-2xl font-bold text-white">
								{botInfo.name}
							</h1>
						</div>
						<button
							onClick={() => setSelectedBot(null)}
							className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
						>
							<Image
								src={closeIcon}
								alt="close-icon"
								width={20}
								height={20}
							/>
						</button>
					</div>

					{/* Content */}
					<div className="p-6 h-[90%] w-full">
						<div className="grid lg:grid-cols-3 gap-6 h-full">
							{/* Left Column - Avatar & Actions */}
							<div className="lg:col-span-1 space-y-6">
								{/* Avatar Section */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
									<h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-4 flex items-center gap-2">
										{/* <ImageIcon className="w-4 h-4" /> */}
										Аватар
									</h3>

									<div className="space-y-4">
										{/* Avatar Preview */}
										<div className="relative group mx-auto w-40 h-40">
											<div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
											<div className="relative w-full h-full bg-gradient-to-br from-purple-800 to-indigo-800 rounded-3xl flex items-center justify-center border-2 border-white/20">
												{/* {botInfo.avatar ? (
													
												) : (
													<></> // <ImageIcon className="w-16 h-16 text-white/50" />
												)} */}
											</div>
											<button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
												<Image
													src={uploadIcon}
													alt="upload-icon"
													width={50}
													height={50}
												/>
											</button>
										</div>

										{/* Upload Button */}
										<button className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-white/10">
											{/* <Upload className="w-4 h-4" /> */}
											Загрузить изображение
										</button>
									</div>
								</div>

								{/* Public Toggle */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-white font-medium mb-1">
												Публичный бот
											</h3>
											<p className="text-sm text-purple-300">
												Доступен всем пользователям
											</p>
										</div>
										<button
											onClick={() => {
												setBotInfo({
													...botInfo,
													is_public:
														!botInfo.is_public,
												});
											}}
											className={`relative w-14 h-8 rounded-full transition-colors ${
												botInfo.is_public
													? "bg-gradient-to-r from-purple-600 to-pink-600"
													: "bg-white/20"
											}`}
										>
											<div
												className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
													botInfo.is_public
														? "translate-x-7"
														: "translate-x-1"
												}`}
											></div>
										</button>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="space-y-3">
									{/* <button onClick={() => router.push(`/user/${bot.user.id}`)} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"}>
										Чат
									</button> */}
									<button
										onClick={(e) => saveBot(e)}
										className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
									>
										{/* <Save className="w-5 h-5" /> */}
										Сохранить
									</button>
								</div>
							</div>

							{/* Right Column - Form Fields */}
							<div className="lg:col-span-2 space-y-6 h-fit">
								{/* Name Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">
										Имя
									</label>
									<input
										type="text"
										value={botInfo.name}
										onChange={(e) => {
											changeBot({
												...botInfo,
												name: e.target.value,
											});
										}}
										className="w-full bg-purple-950/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
										placeholder="Введите имя бота"
									/>
								</div>

								{/* Description Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
										{/* <Globe className="w-4 h-4" /> */}
										Описание
									</label>
									<textarea
										value={botInfo.description}
										onChange={(e) => {
											changeBot({
												...botInfo,
												description: e.target.value,
											});
										}}
										rows={4}
										className="w-full bg-purple-950/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
										placeholder="Опишите вашего бота"
									/>
								</div>

								{/* Public Description Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
										{/* <Globe className="w-4 h-4" /> */}
										Публичное описание
									</label>
									<textarea
										value={botInfo.public_description}
										onChange={(e) => {
											changeBot({
												...botInfo,
												public_description:
													e.target.value,
											});
										}}
										rows={4}
										className="w-full bg-purple-950/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
										placeholder="Публичное описание для других пользователей"
									/>
								</div>

								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
										{/* <Globe className="w-4 h-4" /> */}
										Сценарий
									</label>
									<textarea
										value={botInfo.scenario}
										onChange={(e) => {
											changeBot({
												...botInfo,
												scenario: e.target.value,
											});
										}}
										rows={4}
										className="w-full bg-purple-950/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
										placeholder="Сценарий для общения"
									/>
								</div>

								{/* Tags Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									{botInfo.tags.map((tag) => (
										<div
											key={tag}
											className={`${selectedTheme.options.background} px-2 border p-1 rounded-[10px] flex items-center gap-3`}
										>
											<p>{tag}</p>
											<button
												onClick={() => removeTag(tag)}
												className="hover:scale-103"
											>
												<Image
													src={closeIcon}
													alt="close-icon"
												/>
											</button>
										</div>
									))}

									{adding ? (
										<div className="flex items-center gap-3">
											<input
												type="text"
												value={newTag}
												onChange={(e) =>
													setNewTag(e.target.value)
												}
												className="p-2 border rounded-md"
												placeholder="Новый тег"
												autoFocus
												onKeyDown={(e) =>
													e.key === "Enter" &&
													handleAdd()
												}
											/>
											<button
												onClick={handleAdd}
												className="px-3 py-1 bg-green-500 rounded text-white"
											>
												OK
											</button>
											<button
												onClick={() => setAdding(false)}
												className="px-3 py-[6px] bg-gray-400 rounded text-white"
											>
												<Image
													src={closeIcon}
													alt="close-icon"
													width={20}
													height={20}
												/>
											</button>
										</div>
									) : (
										<button
											onClick={() => setAdding(true)}
											className={`${selectedTheme.options.background} p-3 rounded-[10px] hover:scale-103 border`}
										>
											<Image
												src={addIcon}
												alt="add-icon"
											/>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewBotSettings;
