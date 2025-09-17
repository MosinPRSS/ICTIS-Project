import { IBot, IPersona } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { closeIcon, editIcon, uploadIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useWindow } from "@/hooks/window";

const PersonaSettings = ({
	initialPersona,
	setSelectedPersona,
	getPersona,
}: IPersona) => {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const [isChange, setIsChange] = useState(false);

	const [botInfo, setBotInfo] = useState(initialPersona);
	const { selectedTheme } = useSelector((state: RootState) => state);

	useEffect(() => {
		setBotInfo(initialPersona);
	}, [initialPersona]);

	function changeBot(updatedBot: IBot) {
		setBotInfo(updatedBot);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	function saveBot() {
		setSelectedPersona(botInfo);
		setIsChange(false);
		console.log("Сохраненный бот:", botInfo);
	}

	function cancelEdit() {
		setBotInfo(initialPersona);
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
					<div className="flex items-center gap-3">
						<div className="rounded-[10px] bg-black border-[1px] w-20 h-20"></div>
						<div>
							<p>{botInfo.name}</p>
							<p>{botInfo.description}</p>
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
								onClick={saveBot}
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
									value={botInfo.name}
									onChange={(e) => {
										changeBot({
											...botInfo,
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
									value={botInfo.description}
									onChange={(e) => {
										changeBot({
											...botInfo,
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
									{botInfo.name}
								</p>
							</div>
							<div className="flex flex-col gap-3">
								<p>Описание</p>
								<p
									className={`${selectedTheme.options.text} ${selectedTheme.options.background} rounded-[10px] p-3`}
								>
									{botInfo.description}
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
		</div>
	);
};

export default PersonaSettings;
