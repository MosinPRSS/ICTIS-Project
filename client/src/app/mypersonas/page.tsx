"use client";
import { addIcon } from "@/assets/images/images";
import { useWindow } from "@/hooks/window";
import { IPersona } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { motion } from "motion/react";
import PersonaSettings from "@/components/myPersonasPage/PersonaSettings";
import NewPersonaSettings from "@/components/myPersonasPage/NewPersonaSettings";
import Message from "@/components/Message";
import usePersonaService from "@/api/persona_service";

const MyPersonasPage = () => {
	const { selectedTheme, message, userPersonas } = useSelector(
		(state: RootState) => state
	);
	const { listPersonas } = usePersonaService();
	const windowWidth = useWindow();

	const [userDevice, setUserDevice] = useState(windowWidth);
	const [MyPersonas, setMyPersonas] = useState<IPersona[] | null>(null);
	const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(
		null
	);

	async function getData() {
		try {
			const data = await listPersonas();

			setMyPersonas(data);
		} catch (error) {
			setMyPersonas(null);
			console.log(error);
		}
	}

	useEffect(() => {
		if (userPersonas.userPersonas) {
			setMyPersonas(userPersonas.userPersonas);
		} else {
			getData();
		}
	}, []);

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	return (
		<div
			className={`flex w-full h-full p-10 overflow-y-scroll gap-5 ${
				selectedTheme.options.text
			} ${userDevice === "mobile" && "flex-col"}`}
		>
			<div className="flex flex-col gap-5">
				<h1 className="text-3xl">Мои персоны</h1>

				<div className={`p-10 flex flex-wrap gap-7`}>
					<div
						className={`flex justify-center items-center w-[15rem] h-[20rem] gap-10 border-[1px] rounded-[10px] ${selectedTheme.options.border} ${selectedTheme.options.elementBackground}`}
					>
						<motion.button
							className={`w-30 h-30 p-5 transition duration-200 rounded-full border-[1px] ${selectedTheme.options.border} ${selectedTheme.options.elementBackground}`}
							onHoverStart={(e) => {
								e.target.style.scale = "1.1";
								e.target.style.transform = "rotate(90deg)";
							}}
							onHoverEnd={(e) => {
								e.target.style.scale = "1";
								e.target.style.transform = "rotate(180deg)";
							}}
							onClick={() => {
								setSelectedPersona({
									id: 0,
								});
							}}
						>
							<Image
								className="w-full h-full"
								src={addIcon}
								alt="add-icon"
							></Image>
						</motion.button>
					</div>
					{MyPersonas &&
						MyPersonas.length > 0 &&
						MyPersonas.map((persona) => (
							<button
								key={persona.id}
								className={`text-left flex flex-col w-[15rem] h-[20rem] ${selectedTheme.options.middleground} p-2 border-[1px] border-white hover:scale-105 rounded-[5px]`}
								onClick={() => setSelectedPersona(persona)}
							>
								<div className="w-full rounded-t-xl h-[50%] bg-black"></div>
								<div className="flex flex-col gap-2 p-3 h-[50%] overflow-y-hidden">
									<p>{persona.name}</p>
									<p>{persona.description}</p>
								</div>
							</button>
						))}
				</div>
			</div>
			{selectedPersona !== null ? (
				selectedPersona.id !== 0 ? (
					<PersonaSettings
						initialPersona={selectedPersona}
						setSelectedPersona={setSelectedPersona}
						updatePersonasList={getData}
					/>
				) : (
					<NewPersonaSettings
						setSelectedPersona={setSelectedPersona}
						myPersonas={MyPersonas}
						updatePersonasList={getData}
					/>
				)
			) : (
				<></>
			)}
			{message.isOpen && <Message />}
		</div>
	);
};

export default MyPersonasPage;
