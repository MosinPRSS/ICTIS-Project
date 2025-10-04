"use client";
import { IBot, IFindBot } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import useBotService from "@/api/bot_service";

export default function BotCards({ selectedTags, findBots }: IFindBot) {
	const [bots, setBots] = useState<IBot[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [find, setFind] = useState<IBot[]>([]);
	const [next, setNext] = useState("b/list");
	const { listBot } = useBotService();

	async function getBots() {
		try {
			if (!next) {
				return;
			}
			setIsLoading(true);

			const data = await listBot(next);

			console.log(data);

			setNext(data.next);
			setBots(bots.concat(data.results));
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

		console.log(bots);

		setFind(bots);
	}, [bots]);

	const scroll = useRef<HTMLDivElement>(null);
	const observer = useRef(null);

	useEffect(() => {
		if (!scroll.current) return;

		if (observer.current) {
			observer.current.disconnect();
		}

		if (next) {
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					getBots();
				}
			});
			observer.current.observe(scroll.current);
		}
		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [scroll.current, next]);

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
			{find && find.map((bot) => <BotCard key={bot.id} bot={bot} />)}
			{isLoading ? (
				<Loading />
			) : (
				<div className="w-full h-[1px]" id="scroll" ref={scroll}></div>
			)}
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
				className={`${selectedTheme.options.background} overflow-y-auto w-full h-[50%] p-5 text-white flex flex-col gap-1 rounded-b-xl`}
			>
				<p className="font-semibold">{bot.name}</p>
				<p>Автор: {bot.user?.username}</p>
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
