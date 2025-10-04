import { IBot, IPersona } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { closeIcon, editIcon, uploadIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useWindow } from "@/hooks/window";
import usePersonaService from "@/api/persona_service";
import { openMessage } from "@/store/slices/messageSlice";
import DeleteConfirm from "../DeleteConfirm";

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

	function changeBot(updatedBot: IBot) {
		setPersonaInfo(updatedBot);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
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

			const response = await updatePersona(personaInfo, user.user.id);

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

	function cancelEdit() {
		setPersonaInfo(initialPersona);
		setIsChange(false);
	}

	return (
		<div className="absolute p-10 left-0 top-0 w-full min-h-full h-fit overflow-y-scroll backdrop-blur-3xl flex justify-center items-center">
			<div
				className={`w-[90vw] h-[90vh] flex flex-col gap-10 pt-13 ${
					userDevice === "mobile" ? "p-5" : "p-13"
				} border-[1px] overflow-y-scroll ${
					selectedTheme.options.border
				} rounded-[10px] relative ${
					selectedTheme.options.middleground
				}`}
			>
				<button
					className="absolute right-3 top-3 rounded-full p-1 hover:border-[1px]"
					onClick={() => setSelectedPersona(null)}
				>
					<Image src={closeIcon} alt="close-icon"></Image>
				</button>
				<div className="flex items-center justify-between gap-10">
					<div className="flex items-center gap-5">
						<div className="rounded-[10px] bg-black border-[1px] w-20 h-20"></div>
						<div>
							<p className="text-3xl">{personaInfo.name}</p>
						</div>
					</div>
					{isChange ? (
						<div
							className={`flex gap-3 ${
								userDevice === "mobile" && "flex-col"
							}`}
						>
							<button
								className={`hover:scale-103 rounded-[10px] p-3 border-[1px] ${selectedTheme.options.text} ${selectedTheme.options.background}`}
								onClick={(e) => updatePersonaFunc(e)}
							>
								Сохранить
							</button>
							<button
								className={`hover:scale-103 rounded-[10px] p-3 border-[1px] ${selectedTheme.options.text} ${selectedTheme.options.background}`}
								onClick={cancelEdit}
							>
								Отмена
							</button>
						</div>
					) : (
						<button
							className={`rounded-[10px] p-3 border-[1px]`}
							onClick={() => setIsChange(true)}
						>
							<Image src={editIcon} alt="edit-icon"></Image>
						</button>
					)}
				</div>
				<div
					className={`flex gap-3 w-full justify-between ${
						userDevice === "mobile" && "flex-col"
					}`}
				>
					<div
						className={`${
							userDevice !== "mobile" && "w-[45%]"
						} flex gap-5`}
					>
						<button
							className={`h-fit border-[1px] rounded-[10px] px-5 py-2 hover:scale-103 ${selectedTheme.options.background}`}
						>
							Чат
						</button>
						<button
							className={`h-fit border-[1px] rounded-[10px] px-5 py-2 hover:scale-103 ${selectedTheme.options.background}`}
						>
							Удалить
						</button>
					</div>
					{isChange ? (
						<form
							className={`${
								userDevice !== "mobile" && "w-[45%]"
							} h-full flex flex-col flex-wrap gap-5 overflow-y-auto`}
							onSubmit={(e) => handleSubmit(e)}
						>
							<label
								htmlFor="name"
								className="flex flex-col gap-3"
							>
								<p>Имя</p>
								<input
									type="text"
									id="name"
									className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3 border-[1px]`}
									value={personaInfo.name}
									onChange={(e) => {
										changeBot({
											...personaInfo,
											name: e.target.value,
										});
									}}
								/>
							</label>
							<label
								htmlFor="description"
								className="flex flex-col gap-3"
							>
								<p>Описание</p>
								<textarea
									id="description"
									className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3 border-[1px]`}
									value={personaInfo.description}
									onChange={(e) => {
										changeBot({
											...personaInfo,
											description: e.target.value,
										});
									}}
								/>
							</label>

							<div className="flex flex-col gap-3">
								<p>Аватар</p>
								<input
									id="file-input"
									type="file"
									className="hidden"
								/>
								<label
									className={`w-[100px] h-[100px] p-5 flex justify-center items-center ${selectedTheme.options.background} border-[3px] border-dashed rounded-[10px] cursor-pointer`}
									htmlFor="file-input"
								>
									<Image
										src={uploadIcon}
										alt="upload-icon"
										className="w-full h-full"
									/>
								</label>
							</div>
						</form>
					) : (
						<div
							className={`${
								userDevice !== "mobile" && "w-[45%]"
							} flex flex-col gap-5`}
						>
							<div className="flex flex-col gap-3">
								<p>Имя</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3`}
								>
									{personaInfo.name}
								</p>
							</div>
							<div className="flex flex-col gap-3">
								<p>Описание</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3`}
								>
									{personaInfo.description}
								</p>
							</div>
							<div className="flex flex-col gap-3">
								<p>Аватар</p>
								<div>
									<div className="w-[100px] h-[100px] bg-black rounded-[10px]"></div>
								</div>
							</div>
						</div>
					)}
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
