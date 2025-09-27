import { IPersona } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { uploadIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useWindow } from "@/hooks/window";
import usePersonaService from "@/api/persona_service";
import { addUserPersona } from "@/store/slices/userPersonasSlice";
import { useDispatch } from "react-redux";
import { openMessage } from "@/store/slices/messageSlice";

const newPersona: IPersona = {
	id: 0,
	name: "Новая персона",
	description: "Описание персоны",
	avatar: "https://via.placeholder.com/150",
};

const NewPersonaSettings = ({
	setSelectedPersona,
	myPersonas,
	setMyPersonas,
}: IPersona) => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const { createPersona } = usePersonaService();

	const [personaInfo, setPersonaInfo] = useState(newPersona);
	const { selectedTheme } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		setPersonaInfo(newPersona);
	}, [newPersona]);

	function changePersona(updatedPersona: IPersona) {
		setPersonaInfo(updatedPersona);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	async function savePersona(e: MouseEvent) {
		e.preventDefault();
		try {
			setPersonaInfo({
				...personaInfo,
				id: new Date(),
			});

			const response = await createPersona(personaInfo);

			if (!response) {
				throw new Error("Failed to create bot");
			}

			dispatch(
				addUserPersona({
					id: new Date(),
					name: personaInfo.name,
					description: personaInfo.description,
					avatar: personaInfo.avatar,
				})
			);
			dispatch(openMessage("Бот успешно создан"));
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
			console.log(error);
		} finally {
			setSelectedPersona(null);
		}
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
				<div className="flex items-center justify-between gap-10">
					<div className="flex items-center gap-3">
						<div className="rounded-[10px] bg-black border-[1px] w-20 h-20"></div>
						<div>
							<p>{personaInfo.name}</p>
							<p>{personaInfo.description}</p>
						</div>
					</div>

					<div
						className={`flex gap-3 ${
							userDevice === "mobile" && "flex-col"
						}`}
					>
						<button
							className={`hover:scale-103 rounded-[10px] p-3 border-[1px] ${selectedTheme.options.text} ${selectedTheme.options.background}`}
							onClick={(e) => savePersona(e)}
						>
							Сохранить
						</button>
						<button
							className={`hover:scale-103 rounded-[10px] p-3 border-[1px] ${selectedTheme.options.text} ${selectedTheme.options.background}`}
							onClick={() => setSelectedPersona(null)}
						>
							Отмена
						</button>
					</div>
				</div>
				<div
					className={`flex gap-3 w-full justify-between ${
						userDevice === "mobile" && "flex-col"
					}`}
				>
					<form
						className={`${
							userDevice !== "mobile" && "w-[45%]"
						} h-full flex flex-col flex-wrap gap-5 overflow-y-auto`}
						onSubmit={(e) => handleSubmit(e)}
					>
						<label htmlFor="name" className="flex flex-col gap-3">
							<p>Имя</p>
							<input
								type="text"
								id="name"
								className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3 border-[1px]`}
								value={personaInfo.name}
								onChange={(e) => {
									changePersona({
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
									changePersona({
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
				</div>
			</div>
		</div>
	);
};

export default NewPersonaSettings;
