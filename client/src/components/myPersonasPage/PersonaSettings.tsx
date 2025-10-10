import { IBot, IPersona } from "@/interfaces/entries";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { closeIcon, editIcon, uploadIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useWindow } from "@/hooks/window";
import usePersonaService from "@/api/persona_service";
import { openMessage } from "@/store/slices/messageSlice";
import DeleteConfirm from "../DeleteConfirm";
import AvatarChange from "../AvatarChange";

const PersonaSettings = ({
	initialPersona,
	setSelectedPersona,
	updatePersonasList,
}: IPersona) => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [isChange, setIsChange] = useState(false);
	const { updatePersona, deletePersona } = usePersonaService();

	const [personaInfo, setPersonaInfo] = useState(initialPersona);
	const { selectedTheme, user } = useSelector((state: RootState) => state);
	const [isShowDelete, setShowDelete] = useState(false);

	useEffect(() => {
		setPersonaInfo(initialPersona);
	}, [initialPersona]);

	function changePersona(updatedBot: IBot) {
		setPersonaInfo(updatedBot);
	}

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	const dispatch = useDispatch();
	async function updatePersonaFunc(e: MouseEvent) {
		e.preventDefault();
		try {
			setPersonaInfo({
				...personaInfo,
				id: new Date(),
			});

			const response = await updatePersona(personaInfo, personaInfo.id);

			if (!response) {
				throw new Error("Failed to update persona");
			}

			updatePersonasList();
			dispatch(openMessage("Информация о персоне обновлена!"));
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
			console.log(error);
		} finally {
			setSelectedPersona(personaInfo);
			setIsChange(false);
		}
	}

	async function deletePersonaFunc() {
		try {
			const response = await deletePersona(personaInfo.id);

			if (!response) {
				throw new Error("Failed to delete bot");
			}
			await updatePersonasList();

			dispatch(openMessage("Бот удалён"));
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
			console.log(error);
		} finally {
			setSelectedPersona(null);
		}
	}

	return (
		<div className="absolute inset-0 min-h-screen h-fit backdrop-blur-3xl flex items-center justify-center">
			{/* Modal Container */}
			<div className={`relative`}>
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
								{personaInfo.name}
							</h1>
						</div>
						<button
							onClick={() => setSelectedPersona(null)}
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
											<AvatarChange
												Info={personaInfo}
												setInfo={changePersona}
											/>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="space-y-3">
									{/* <button onClick={() => router.push(`/user/${bot.user.id}`)} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"}>
										Чат
									</button> */}
									<button
										onClick={(e) => updatePersonaFunc(e)}
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
							<div
								className={`lg:col-span-2 space-y-6 ${
									userDevice === "mobile"
										? "h-fit"
										: "h-full overflow-y-auto"
								}`}
							>
								{/* Name Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">
										Имя
									</label>
									<input
										type="text"
										value={personaInfo.name}
										onChange={(e) => {
											changePersona({
												...personaInfo,
												name: e.target.value,
											});
										}}
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
										placeholder="Введите имя персоны"
									/>
								</div>

								{/* Description Field */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
									<label className="block text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
										{/* <Globe className="w-4 h-4" /> */}
										Описание
									</label>
									<textarea
										value={personaInfo.description}
										onChange={(e) => {
											changePersona({
												...personaInfo,
												description: e.target.value,
											});
										}}
										rows={4}
										className={`w-full ${selectedTheme.options.background} text-white px-4 py-3 rounded-xl border border-white/10 ${selectedTheme.options.focusBorder} focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
										placeholder="Опишите вашу персону"
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
					entity={personaInfo.name}
					del={deletePersonaFunc}
				/>
			)}
		</div>
	);
};

export default PersonaSettings;
