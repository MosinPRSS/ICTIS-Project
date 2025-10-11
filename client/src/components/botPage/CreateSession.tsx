import { closeIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import usePersonaService from "@/api/persona_service";
import { IPersona } from "@/interfaces/entries";
import { useRouter } from "next/navigation";
import useSessionService from "@/api/session_service";
import { openMessage } from "@/store/slices/messageSlice";

const CreateSession = ({ setIsCreatingSession, botID }) => {
	const [loadingPersonas, setLoadingPersonas] = useState(false);
	const { selectedTheme } = useSelector((state: RootState) => state);

	const { listPersonas } = usePersonaService();
	const { readSessions, createSession } = useSessionService();

	const router = useRouter();
	const dispatch = useDispatch();

	const [personasList, setPersonasList] = useState<
		undefined | null | IPersona[]
	>(null);

	const redirect = async (
		e: MouseEvent,
		botId: string,
		personaId: string
	) => {
		try {
			e.preventDefault();

			const sessionsResponse = await readSessions();
			if (!sessionsResponse) {
				throw new Error("Failed to get sessions");
			}

			const session = sessionsResponse.find(
				(session) =>
					session.chatbot.id === botId &&
					session.persona.id === personaId
			);
			if (session) {
				sessionStorage.setItem("selectedChat", JSON.stringify(session));
				router.push(`/chats/${session.id}`);
			} else {
				const newSession = await createSession(personaId, botID);
				if (newSession) {
					console.log(newSession);

					sessionStorage.setItem(
						"selectedChat",
						JSON.stringify(newSession)
					);
					router.push(`/chats/${newSession.id}`);
				}
			}
			setIsCreatingSession(false);
		} catch (error) {
			dispatch(openMessage("Произошла ошибка"));
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setLoadingPersonas(true);

				const response = await listPersonas();

				if (!response) throw new Error("Failed to get list personas");

				setPersonasList(response);
			} catch (error) {
				setPersonasList(undefined);
				console.log(error);
			} finally {
				setLoadingPersonas(false);
			}
		})();
	}, []);

	return (
		<div className="absolute top-0 left-0 w-full h-full backdrop-blur-3xl z-50 flex items-center justify-center">
			<div
				className={`flex min-w-[18rem] w-[30vw] flex-col items-center gap-5 p-5 border-[1px] rounded-2xl ${selectedTheme.options.elementBackground} ${selectedTheme.options.border} ${selectedTheme.options.text}`}
			>
				<div className="flex items-center justify-between w-full mb-10">
					<p className="text-2xl">Выберите персону</p>
					<button
						onClick={() => setIsCreatingSession(false)}
						className="rounded-[5px]"
					>
						<Image
							src={closeIcon}
							alt="close-icon"
							width={20}
							height={20}
						/>
					</button>
				</div>
				{loadingPersonas ? (
					<Loading />
				) : personasList ? (
					<div className="flex flex-col items-center justify-center gap-3 w-full">
						{personasList.map((persona) => (
							<button
								key={persona.id}
								onClick={(e) => redirect(e, botID, persona.id)}
								className={`${selectedTheme.options.middleground} hover:bg-gray-200 hover:text-black flex items-center gap-3 text-start border-[1px] rounded-[10px] w-full p-5 rounded-[5px]`}
							>
								<Image
									src={persona.avatar}
									alt="avatar"
									width={50}
									height={50}
									className="rounded-full border-[1px]"
								/>
								<p>{persona.name}</p>
							</button>
						))}
					</div>
				) : (
					<p className="">Не удалось получить список персон</p>
				)}
			</div>
		</div>
	);
};

export default CreateSession;
