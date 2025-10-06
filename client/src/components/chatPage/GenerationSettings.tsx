import useSessionService from "@/api/session_service";
import { cancelIcon } from "@/assets/images/images";
import { openMessage } from "@/store/slices/messageSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";

const GenerationSettings = ({
	setShowGenerationSettings,
	chatInfo,
	setChatInfo,
}) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const { updateGenerationSettings } = useSessionService();

	const [temperature, setTemperature] = React.useState(chatInfo.temperature);
	const [tokens, setTokens] = React.useState(chatInfo.tokens);

	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();

	async function updateSettings(e: MouseEvent) {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await updateGenerationSettings(
				chatInfo.id,
				tokens,
				temperature
			);

			console.log(response);

			if (!response) {
				throw new Error("Failed to update settings");
			}

			setChatInfo(response);
			dispatch(openMessage("Настройки обновлены"));
			setShowGenerationSettings(false);
		} catch (error) {
			console.log(error);
			dispatch(openMessage("Не удалось обновить настройки"));
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className={`${selectedTheme.options.background} text-white rounded-2xl p-5 w-full max-w-md border border-white/10`}
			>
				<div className="flex items-center justify-between mb-5">
					<h3 className="text-lg font-semibold">
						Настройка генерации
					</h3>
					<button
						onClick={() => setShowGenerationSettings(false)}
						className="p-1 rounded-full hover:bg-white/10 transition-colors"
					>
						<Image
							src={cancelIcon}
							alt="cancel-icon"
							width={20}
							height={20}
						/>
					</button>
				</div>

				{isLoading ? (
					<Loading />
				) : (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">
								Температура
							</label>
							<input
								type="range"
								min="0"
								max="1"
								step="0.1"
								value={temperature}
								onInput={(e) =>
									setTemperature(
										Number(e.currentTarget.value)
									)
								}
								className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
							/>
							<div className="flex justify-between text-xs text-white/60 mt-1">
								<span>Более точный</span>
								<span>Более креативный</span>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Максимальная длина
							</label>
							<input
								type="range"
								min="50"
								max="1000"
								step="50"
								value={tokens}
								onInput={(e) =>
									setTokens(Number(e.currentTarget.value))
								}
								className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
							/>
							<div className="flex justify-between text-xs text-white/60 mt-1">
								<span>Коротко</span>
								<span>Подробно</span>
							</div>
						</div>

						<button
							onClick={(e) => updateSettings(e)}
							className={`w-full mt-4 py-3 ${selectedTheme.options.middleground} hover:bg-amber-50 rounded-xl hover:text-black font-medium transition-colors`}
						>
							Сохранить настройки
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default GenerationSettings;
