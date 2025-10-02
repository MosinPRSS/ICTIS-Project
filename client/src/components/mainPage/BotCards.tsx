"use client";
import { IBot, IFindBot } from "@/interfaces/interfaces";
import getBotsDashboard from "@/services/getBotsDashboard";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { useRouter } from "next/navigation";

export default function BotCards({ selectedTags, findBots }: IFindBot) {
	const [bots, setBots] = useState<IBot[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [find, setFind] = useState<IBot[]>([]);
	const [count, setCount] = useState(30);

	async function getBots() {
		try {
			setIsLoading(true);
			const data = await getBotsDashboard();
			setBots(bots.length === 0 ? data.results : [...bots, data.results]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getBots();
	}, []);

	useEffect(() => {
		if (!bots) return;

		setFind(bots);
	}, [bots]);

	const scroll = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setCount((prev) => prev + 30);
			}
		});
		observer.observe(scroll.current);
		return () => observer.disconnect();
	}, []);
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
				<Loading />
			) : find ? (
				<>
					{find.map((bot) => (
						<BotCard key={bot.id} bot={bot} />
					))}
				</>
			) : (
				<p>Ничего не найдено</p>
			)}
			<div className="w-full h-[1px]" id="scroll" ref={scroll}></div>
		</>
	);
}

export function BotCard({ bot }: { bot: IBot }) {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const router = useRouter();
	function redirect(e: MouseEvent, id: string) {
		e.preventDefault();
		router.push(`/bot/${id}`);
	}
	return (
		<button
			onClick={(e) => redirect(e, bot.id)}
			className="text-left w-[15rem] h-[20rem] bg-violet-800 border-[1px] border-white rounded-xl hover:scale-105 transition duration-75 cursor-pointer  relative"
		>
			<div className="w-full rounded-t-xl h-[50%] bg-black" />
			<div
				className={`${selectedTheme.options.background} overflow-y-auto w-full h-[50%] p-5 text-white flex flex-col gap-2 rounded-b-xl`}
			>
				<p className="font-semibold">{bot.name}</p>
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
		</button>
	);
}
