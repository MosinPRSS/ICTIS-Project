"use client";
import { addIcon } from "@/assets/images/images";
import { useWindow } from "@/hooks/window";
import { IPersona } from "@/interfaces/entries";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { motion } from "motion/react";
import PersonaSettings from "@/components/myPersonasPage/PersonaSettings";
import NewPersonaSettings from "@/components/myPersonasPage/NewPersonaSettings";
import Message from "@/components/Message";
import usePersonaService from "@/api/persona_service";
import Loading from "@/components/Loading";
import Card from "@/components/Card";

const MyPersonasPage = () => {
	const { selectedTheme, message, userPersonas } = useSelector(
		(state: RootState) => state
	);
	const { listPersonas } = usePersonaService();
	const windowWidth = useWindow();
	const [isLoading, setIsLoading] = useState(true);

	const [userDevice, setUserDevice] = useState(windowWidth);
	const [MyPersonas, setMyPersonas] = useState<IPersona[] | null>(null);
	const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(
		null
	);

	async function getData() {
		setIsLoading(true);
		try {
			const data = await listPersonas();

			setMyPersonas(data);
		} catch (error) {
			setMyPersonas(null);
			console.log(error);
		} finally {
			setIsLoading(false);
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
		<div className="bg-gradient-to-r from-[#7F6AAD] to-[#5F4B8B] text-white/80 p-6 min-h-screen font-sans">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-white/60 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
						Мои персоны
					</h1>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/90 border-r-2 border-white/30"></div>
					</div>
				) : (
					<div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
						<motion.button
							className="bg-gradient-to-l from-[#7F6AAD] to-[#7F6AAD] backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card min-h-[300px] flex flex-col items-center justify-center gap-4"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => {
								setSelectedPersona({
									id: 0,
								});
							}}
						>
							<div className="relative group">
								<div className="bg-gradient-to-br from-[#7F6AAD]/60 to-[#5F4B8B]/60 rounded-2xl p-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
									<Image
										src={addIcon}
										alt="add-icon"
										width={80}
										height={80}
										className="transition-all duration-500 group-hover:rotate-90"
									/>
								</div>
								<div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</div>
							<span className="text-xl font-semibold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
								Добавить персону
							</span>
						</motion.button>

						{MyPersonas &&
							MyPersonas.length > 0 &&
							MyPersonas.map((persona) => (
<<<<<<< HEAD
								<motion.button
									key={persona.id}
									className="bg-gradient-to-l from-[#7F6AAD] to-[#7F6AAD] backdrop-blur-sm rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 border-2 border-white/30 hover:border-4 hover:border-white group custom-border-card min-h-[300px] text-left flex flex-col overflow-hidden"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setSelectedPersona(persona)}
								>
									<div className="w-full h-[120px] rounded-2xl bg-gradient-to-br from-violet-600/30 to-violet-800/30 backdrop-blur-sm mb-4 flex items-center justify-center border-2 border-white/20">
										{persona.avatar ? (
											<Image
												src={persona.avatar}
												alt={persona.name}
												width={80}
												height={80}
												className="rounded-xl border-2 border-white/20"
											/>
										) : (
											<div className="text-white/60 text-lg font-semibold">
												{persona.name?.charAt(0).toUpperCase()}
											</div>
										)}
									</div>
									
									<div className="flex flex-col gap-3 flex-1">
										<h3 className="text-xl font-bold text-white break-words bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent line-clamp-2">
											{persona.name}
										</h3>
										<div className="bg-gradient-to-br from-violet-600/30 to-violet-800/30 backdrop-blur-sm rounded-2xl p-3 flex-1 border-2 border-white/20">
											<p className="text-white/80 text-sm line-clamp-4 whitespace-pre-wrap">
												{persona.description || "Описание отсутствует"}
											</p>
										</div>
									</div>
								</motion.button>
=======
								<Card
									entity={persona}
									fun={setSelectedPersona}
									arg={persona}
									key={persona.id}
								/>
>>>>>>> 6225e14f4361412a6f758df9430bf2648f4912d1
							))}
					</div>
				)}
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
			) : null}

			{message.isOpen && <Message />}

			<style jsx>{`
				.custom-border-card {
					position: relative;
					background-clip: padding-box;
				}

				.custom-border-card::before {
					content: '';
					position: absolute;
					top: -2px;
					left: -2px;
					right: -2px;
					bottom: -2px;
					background: linear-gradient(to left, rgba(255,255,255,0.4), rgba(255,255,255,0.2), rgba(255,255,255,0));
					border-radius: 24px;
					z-index: -1;
					opacity: 0.8;
					transition: opacity 0.5s ease;
				}

				.custom-border-card:hover::before {
					opacity: 1;
				}

				.line-clamp-2 {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.line-clamp-4 {
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</div>
	);
};

export default MyPersonasPage;