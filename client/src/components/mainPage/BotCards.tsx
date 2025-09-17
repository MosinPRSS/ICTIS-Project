"use client";
import { IBot, IFindBot } from "@/interfaces/interfaces";
import getBotsDashboard from "@/services/getBotsDashboard";
import { RootState } from "@/store/store";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BotCards({ selectedTags, findBots }: IFindBot) {
	const [bots, setBots] = useState<IBot[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [find, setFind] = useState<IBot[]>([]);

	useEffect(() => {
		(async function getBots() {
			try {
				setIsLoading(true);
				const data = await getBotsDashboard();
				setBots(data);
			} catch (error) {
				setBots(null);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		if (!bots) return;
		setFind(bots);
	}, [bots]);

	function search() {
		if (!bots) return;
		setFind(
			bots.filter((bot) => {
				// Фильтрация по поиску
				if (
					findBots &&
					!bot.name.toLowerCase().includes(findBots.toLowerCase())
				) {
					return false;
				}

				// Фильтрация по тегам
				if (
					selectedTags.length > 0 &&
					!selectedTags.every((tag) => bot.tags.includes(tag))
				) {
					return false;
				}

				return true;
			})
		);
	}

	useEffect(() => {
		search();
	}, [findBots, selectedTags]);
	return (
		<>
			{isLoading ? (
				<motion.div
					className="w-[50px] h-[50px] border-8 border-dotted border-white rounded-full fixed top-1/2 left-1/2"
					animate={{ rotate: 360 }}
					transition={{
						duration: 2,
						repeat: Infinity,
						type: "spring",
					}}
				/>
			) : find ? (
				find.map((bot) => <BotCard key={bot.id} bot={bot} />)
			) : (
				<p>Ничего не найдено</p>
			)}
		</>
	);
}

export function BotCard({ bot }: { bot: IBot }) {
	const { selectedTheme } = useSelector((state: RootState) => state);
	return (
		<Link
			href={{
				pathname: `/bot/`,
				query: {
					bot: bot.id,
				},
			}}
			className="text-left w-[15rem] h-[20rem] bg-violet-800 border-[1px] border-white rounded-xl hover:scale-105 transition duration-75 cursor-pointer  relative"
		>
			<div className="w-full rounded-t-xl h-[50%] bg-black" />
			<div
				className={`${selectedTheme.options.background} overflow-y-auto w-full h-[50%] p-5 text-white flex flex-col gap-2 rounded-b-xl`}
			>
				<p className="font-semibold">{bot.name}</p>
				<p className="text-sm text-gray-300">by {bot.author}</p>
				<p className="text-sm mt-2 line-clamp-2">{bot.description}</p>
				<div className="flex flex-wrap items-center gap-2">
					<p>Теги: </p>
					{bot.tags &&
						bot.tags.map((tag) => (
							<p className="text-sm text-gray-300" key={tag}>
								{tag}
							</p>
						))}
				</div>
			</div>
		</Link>
	);
}
