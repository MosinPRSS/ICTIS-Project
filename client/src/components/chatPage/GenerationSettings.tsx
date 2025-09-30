import { cancelIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const GenerationSettings = ({ setShowGenerationSettings }) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
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
							defaultValue="0.7"
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
							defaultValue="200"
							className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
						/>
						<div className="flex justify-between text-xs text-white/60 mt-1">
							<span>Коротко</span>
							<span>Подробно</span>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Стиль ответов
						</label>
						<select className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white">
							<option>Сбалансированный</option>
							<option>Профессиональный</option>
							<option>Креативный</option>
							<option>Краткий</option>
						</select>
					</div>

					<button
						onClick={() => setShowGenerationSettings(false)}
						className={`w-full mt-4 py-3 ${selectedTheme.options.middleground} hover:bg-amber-50 rounded-xl hover:text-black font-medium transition-colors`}
					>
						Сохранить настройки
					</button>
				</div>
			</div>
		</div>
	);
};

export default GenerationSettings;
