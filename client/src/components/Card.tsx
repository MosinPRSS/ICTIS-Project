import { questionIcon } from "@/assets/images/images";
import { RootState } from "@/store/store";
import { DEFAULT_IMAGE_SRC } from "@/types/defaultImageSrc";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Card = ({ entity, fun, arg }) => {
	const { selectedTheme } = useSelector((state: RootState) => state);

	return (
		<button
			key={entity.id}
			className={`group relative text-left flex flex-col w-[15rem] h-[30rem] ${selectedTheme.options.middleground} rounded-2xl overflow-hidden shadow-2xl hover:scale-105 hover:shadow-purple-500/50 transition-all duration-500 border border-white/10 backdrop-blur-sm`}
			onClick={() => fun(arg)}
		>
			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

			{/* Avatar section with glassmorphism */}
			<div className="relative h-[40%] bg-gradient-to-br from-gray-900 via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
				{/* Animated background blob */}
				<div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
				{/* ЗДЕСЬ */}
				<Image
					src={
						entity.avatar == DEFAULT_IMAGE_SRC
							? questionIcon
							: entity.avatar
					}
					alt="entity-avatar"
					width={140}
					height={140}
					className="relative z-10 rounded-2xl border-4 border-white/20 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 object-cover"
				/>
			</div>

			{/* Content section */}
			<div className="relative flex flex-col gap-2 p-5 h-[60%] bg-gradient-to-b from-transparent to-black/40">
				<div className="flex flex-col h-[20%] gap-2">
					<p className="font-bold text-xl truncate text-white group-hover:text-purple-300 transition-colors duration-300">
						{entity.name}
					</p>
					<p className="text-xs font-medium text-purple-300/80 uppercase tracking-wider">
						{entity?.user?.username}
					</p>
				</div>
				<p className="text-sm text-gray-300/90 line-clamp-2 leading-relaxed mt-1 h-[50%] overflow-hidden">
					{entity?.description}
				</p>
				<div className="flex flex-wrap gap-2 h-[30%]">
					{entity.tags?.map((tag) => (
						<p
							key={tag}
							className="text-xs h-fit font-medium p-[5px] border-[1px] rounded-[5px] border-white/90 text-gray-400/80 tracking-wider"
						>
							#{tag}
						</p>
					))}
				</div>

				{/* Decorative corner accent */}
				<div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/30 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			</div>

			{/* Shimmer effect on hover */}
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
		</button>
	);
};

export default Card;
