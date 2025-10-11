import { IBot, ISelectedBot } from "@/interfaces/entries";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	addIcon,
	closeIcon,
	editIcon,
	uploadIcon,
} from "@/assets/images/images";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useWindow } from "@/hooks/window";
import useBotService from "@/api/bot_service";
import { openMessage } from "@/store/slices/messageSlice";
import DeleteConfirm from "../DeleteConfirm";
import AvatarChange from "../AvatarChange";

const BotSettings = ({
	initialBot,
	setSelectedBot,
	updateBotsList,
}: ISelectedBot) => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [isChange, setIsChange] = useState(false);
	const { updateBot, deleteBot } = useBotService();

	const [botInfo, setBotInfo] = useState(initialBot);
	const { selectedTheme } = useSelector((state: RootState) => state);
	const [isShowDelete, setShowDelete] = useState(false);

	useEffect(() => {
		console.log(initialBot);

		setBotInfo(initialBot);
	}, [initialBot]);

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

	const dispatch = useDispatch();
	async function updateBotFunc(e: MouseEvent) {
		e.preventDefault();
		try {
			const response = await updateBot(botInfo, botInfo.id);

			if (!response) {
				throw new Error("Failed to create bot");
			}
			setBotInfo(response);
			await updateBotsList();

			dispatch(openMessage("Информация о боте была обновлена"));
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
			console.log(error);
		} finally {
			setSelectedBot(null);
		}
	}

	async function deleteBotFunc() {
		try {
			const response = await deleteBot(botInfo.id);

			if (!response) {
				throw new Error("Failed to delete bot");
			}
			await updateBotsList();

			dispatch(openMessage("Бот удалён"));
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
			console.log(error);
		} finally {
			setSelectedBot(null);
		}
	}

	return (
		<div
			className={`absolute inset-0 min-h-screen ${
				userDevice === "mobile" ? "p-3" : "p-10"
			} backdrop-blur-3xl flex items-center justify-center`}
		>
			{/* Modal Container */}
			<div className="w-[90%] h-[90%] relative">
				{/* Modal */}
				<div
					className={`w-full h-fit relative ${selectedTheme.options.middleground} backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl`}
				>
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
								alt="cancel-icon"
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
										<div className="relative group mx-auto w-40 h-40">
											<AvatarChange
												Info={botInfo}
												setInfo={changeBot}
											/>
										</div>
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
												{botInfo.is_public
													? "Бот виден всем пользователям"
													: "Ваш личный чат бот"}
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
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-white font-medium mb-1">
												Скрыть информацию о боте
											</h3>
											<p className="text-sm text-purple-300">
												{botInfo.hide_info
													? "Некоторые данные скрыты"
													: "Все данные отображаются"}
											</p>
										</div>
										<button
											onClick={() => {
												setBotInfo({
													...botInfo,
													hide_info:
														!botInfo.hide_info,
												});
											}}
											className={`relative w-14 h-8 rounded-full transition-colors ${
												botInfo.hide_info
													? "bg-gradient-to-r from-purple-600 to-pink-600"
													: "bg-white/20"
											}`}
										>
											<div
												className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
													botInfo.hide_info
														? "translate-x-7"
														: "translate-x-1"
												}`}
											></div>
										</button>
									</div>
								</div>
								{/* Tags Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex gap-3 flex-wrap">
									{botInfo.tags.map((tag) => (
										<div
											key={tag}
											className={`${selectedTheme.options.background} w-fit px-2 border p-1 rounded-[10px] flex items-center gap-3`}
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
										<div className="flex items-center gap-2">
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

								{/* Action Buttons */}
								<div className="space-y-3">
									{/* <button onClick={() => router.push(`/user/${bot.user.id}`)} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"}>
										Чат
									</button> */}
									<button
										onClick={(e) => updateBotFunc(e)}
										className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
									>
										{/* <Save className="w-5 h-5" /> */}
										Сохранить
									</button>

									<button
										onClick={() => setShowDelete(true)}
										className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-red-500/30"
									>
										{/* <Trash2 className="w-5 h-5" /> */}
										Удалить
									</button>
								</div>
							</div>

							{/* Right Column - Form Fields */}
							<div className="lg:col-span-2 space-y-6 h-full">
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
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
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
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
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
										value={botInfo.publicDescription}
										onChange={(e) => {
											changeBot({
												...botInfo,
												publicDescription:
													e.target.value,
											});
										}}
										rows={4}
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
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
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
										placeholder="Сценарий для общения"
									/>
								</div>
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
										{/* <Globe className="w-4 h-4" /> */}
										Первое сообщение
									</label>
									<textarea
										value={botInfo.first_message}
										onChange={(e) => {
											changeBot({
												...botInfo,
												first_message: e.target.value,
											});
										}}
										rows={4}
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
										placeholder="Что бот напишет пользователю?"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isShowDelete && (
				<DeleteConfirm
					setShowDeleteConfirm={setShowDelete}
					entity={botInfo.name}
					del={deleteBotFunc}
				/>
			)}
		</div>

		/////////////////////////////////////////////////////////////////

		// <div className="absolute p-10 left-0 top-0 w-full min-h-full h-fit overflow-y-scroll backdrop-blur-3xl flex justify-center items-center">
		// 	<div
		// 		className={`w-[90vw] h-[90vh] flex flex-col gap-10 pt-13 ${
		// 			userDevice === "mobile" ? "p-5" : "p-13"
		// 		} border-[1px] overflow-y-scroll ${
		// 			selectedTheme.options.border
		// 		} rounded-[10px] relative ${
		// 			selectedTheme.options.middleground
		// 		}`}
		// 	>
		// 		<button
		// 			className="absolute right-3 top-3 rounded-full p-1 hover:border-[1px]"
		// 			onClick={() => setSelectedBot(null)}
		// 		>
		// 			<Image src={closeIcon} alt="close-icon"></Image>
		// 		</button>
		// 		<div className="flex items-center justify-between gap-10">
		// 			<div className="flex items-center gap-3">
		// 				<div className="rounded-[10px] bg-black border-[1px] w-20 h-20"></div>
		// 				<div>
		// 					<p>{botInfo.name}</p>
		// 				</div>
		// 			</div>
		// 			{isChange ? (
		// 				<div
		// 					className={`flex gap-3 ${
		// 						userDevice === "mobile" && "flex-col"
		// 					}`}
		// 				>
		// 					<button
		// 						className={`hover:scale-103 rounded-[10px] p-3 border-[1px] ${selectedTheme.options.text} ${selectedTheme.options.background}`}
		// 						onClick={(e) => updateBotFunc(e)}
		// 					>
		// 						Сохранить
		// 					</button>
		// 					<button
		// 						className={`hover:scale-103 rounded-[10px] p-3 border-[1px] ${selectedTheme.options.text} ${selectedTheme.options.background}`}
		// 						onClick={cancelEdit}
		// 					>
		// 						Отмена
		// 					</button>
		// 				</div>
		// 			) : (
		// 				<button
		// 					className={`rounded-[10px] p-3 border-[1px]`}
		// 					onClick={() => setIsChange(true)}
		// 				>
		// 					<Image src={editIcon} alt="edit-icon"></Image>
		// 				</button>
		// 			)}
		// 		</div>
		// 		<div className={`flex gap-3 w-full justify-between flex-col`}>
		// 			<div
		// 				className={`${
		// 					userDevice !== "mobile" && "w-[45%]"
		// 				} flex gap-5`}
		// 			>
		// 				<button
		// 					className={`h-fit border-[1px] rounded-[10px] px-5 py-2 hover:scale-103 ${selectedTheme.options.background}`}
		// 				>
		// 					Чат
		// 				</button>
		// 				<button
		// 					onClick={() => setShowDelete(true)}
		// 					className={`h-fit border-[1px] rounded-[10px] px-5 py-2 hover:scale-103 ${selectedTheme.options.background}`}
		// 				>
		// 					Удалить
		// 				</button>
		// 			</div>
		// 			{isChange ? (
		// 				<form
		// 					className={`w-full justify-between items-center h-full flex flex-wrap gap-5 overflow-y-auto`}
		// 					onSubmit={(e) => handleSubmit(e)}
		// 				>
		// 					<label
		// 						htmlFor="name"
		// 						className="flex flex-col gap-3 w-[45%]"
		// 					>
		// 						<p>Имя</p>
		// 						<input
		// 							type="text"
		// 							id="name"
		// 							className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3 border-[1px]`}
		// 							value={botInfo.name}
		// 							onChange={(e) => {
		// 								changeBot({
		// 									...botInfo,
		// 									name: e.target.value,
		// 								});
		// 							}}
		// 						/>
		// 					</label>
		// 					<label
		// 						htmlFor="description"
		// 						className="flex flex-col w-[45%] gap-3"
		// 					>
		// 						<p>Описание</p>
		// 						<textarea
		// 							id="description"
		// 							className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3 border-[1px]`}
		// 							value={botInfo.description}
		// 							onChange={(e) => {
		// 								changeBot({
		// 									...botInfo,
		// 									description: e.target.value,
		// 								});
		// 							}}
		// 						/>
		// 					</label>
		// 					<label
		// 						htmlFor="public-description"
		// 						className="flex flex-col gap-3 w-[45%]"
		// 					>
		// 						<p>Публичное описание</p>
		// 						<textarea
		// 							id="public-description"
		// 							className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3 border-[1px]`}
		// 							value={botInfo.publicDescription}
		// 							onChange={(e) => {
		// 								changeBot({
		// 									...botInfo,
		// 									publicDescription: e.target.value,
		// 								});
		// 							}}
		// 						/>
		// 					</label>
		// 					<div className="flex gap-3 flex-wrap">
		// 						{botInfo.tags.map((tag) => (
		// 							<div
		// 								key={tag}
		// 								className={`${selectedTheme.options.background} px-2 border p-1 rounded-[10px] flex items-center gap-3`}
		// 							>
		// 								<p>{tag}</p>
		// 								<button
		// 									onClick={() => removeTag(tag)}
		// 									className="hover:scale-103"
		// 								>
		// 									<Image
		// 										src={closeIcon}
		// 										alt="close-icon"
		// 									/>
		// 								</button>
		// 							</div>
		// 						))}

		// 						{adding ? (
		// 							<div className="flex items-center gap-2">
		// 								<input
		// 									type="text"
		// 									value={newTag}
		// 									onChange={(e) =>
		// 										setNewTag(e.target.value)
		// 									}
		// 									className="p-2 border rounded-md"
		// 									placeholder="Новый тег"
		// 									autoFocus
		// 									onKeyDown={(e) =>
		// 										e.key === "Enter" && handleAdd()
		// 									}
		// 								/>
		// 								<button
		// 									onClick={handleAdd}
		// 									className="px-3 py-1 bg-green-500 rounded text-white"
		// 								>
		// 									OK
		// 								</button>
		// 								<button
		// 									onClick={() => setAdding(false)}
		// 									className="px-3 py-1 bg-gray-400 rounded text-white"
		// 								>
		// 									✕
		// 								</button>
		// 							</div>
		// 						) : (
		// 							<button
		// 								onClick={() => setAdding(true)}
		// 								className={`${selectedTheme.options.background} p-3 rounded-[10px] hover:scale-103 border`}
		// 							>
		// 								<Image src={addIcon} alt="add-icon" />
		// 							</button>
		// 						)}
		// 					</div>

		// 					<div className="flex gap-3 items-center">
		// 						<p>Публичный бот</p>
		// 						<button
		// 							type="button"
		// 							className={`w-[60px] h-[30px] ${
		// 								botInfo.is_public
		// 									? "bg-green-500 justify-end"
		// 									: "bg-gray-500 justify-start"
		// 							} rounded-[15px] flex items-center p-1 px-2 border-[1px]`}
		// 							onClick={() => {
		// 								setBotInfo({
		// 									...botInfo,
		// 									is_public: !botInfo.is_public,
		// 								});
		// 							}}
		// 						>
		// 							<div className="w-[14px] h-[14px] bg-white rounded-full"></div>
		// 						</button>
		// 					</div>
		// 				</form>
		// 			) : (
		// 				<div
		// 					className={`w-full flex justify-between gap-5 flex-wrap`}
		// 				>
		// 					<div className="flex flex-col gap-3 w-[45%]">
		// 						<p>Имя</p>
		// 						<p
		// 							className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3`}
		// 						>
		// 							{botInfo.name}
		// 						</p>
		// 					</div>
		// 					<div className="flex flex-col gap-3 w-[45%]">
		// 						<p>Описание</p>
		// 						<p
		// 							className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3`}
		// 						>
		// 							{botInfo.description}
		// 						</p>
		// 					</div>
		// 					<div className="flex flex-col gap-3 w-[45%]">
		// 						<p>Публичное описание</p>
		// 						<p
		// 							className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3`}
		// 						>
		// 							{botInfo.publicDescription}
		// 						</p>
		// 					</div>
		// 					<div className="flex items-center gap-3 flex-wrap">
		// 						<p>Теги: </p>
		// 						{botInfo.tags.map((tag) => (
		// 							<span
		// 								key={tag}
		// 								className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-2`}
		// 							>
		// 								{tag}
		// 							</span>
		// 						))}
		// 					</div>
		// 					<div className="flex gap-3 items-center">
		// 						<p>Публичный бот</p>
		// 						<div
		// 							className={`w-[60px] h-[30px] ${
		// 								botInfo.is_public
		// 									? "bg-green-500 justify-end"
		// 									: "bg-gray-500 justify-start"
		// 							} rounded-[15px] flex items-center p-1 px-2 border-[1px]`}
		// 						>
		// 							<div className="w-[14px] h-[14px] bg-white rounded-full"></div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			)}
		// 		</div>
		// 	</div>
		// 	{isShowDelete && (
		// 		<DeleteConfirm
		// 			setShowDeleteConfirm={setShowDelete}
		// 			entity={botInfo.name}
		// 			del={deleteBotFunc}
		// 		/>
		// 	)}
		// </div>
	);
};

export default BotSettings;
