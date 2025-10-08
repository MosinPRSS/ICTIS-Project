"use client";
import { IFindBot } from "@/interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import useBotService from "@/api/bot_service";
import { IBot } from "@/interfaces/entries";
import Card from "../Card";
import { useRouter } from "next/navigation";

export default function BotCards({ selectedTags, findBots }: IFindBot) {
	const [bots, setBots] = useState<IBot[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [find, setFind] = useState<IBot[]>([]);
	const [next, setNext] = useState("b/list");
	const { listBot } = useBotService();

	const router = useRouter();

	async function getBots() {
		try {
			if (!next) {
				return;
			}
			setIsLoading(true);

			const data = await listBot(next);

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

	async function search() {
		setBots([]);

		if (!findBots || findBots === "") {
			setNext("b/list");
			await getBots();
		}
	}

	function redirect(id: string) {
		router.push(`/bot/${id}`);
	}

	useEffect(() => {
		search();
	}, [findBots, selectedTags]);
	return (
		<>
			{find &&
				find.map((bot) => (
					<Card
						key={bot.id}
						entity={bot}
						fun={redirect}
						arg={bot.id}
					/>
				))}
			{isLoading ? (
				<div>
					<Loading />
				</div>
			) : (
				<div className="w-full h-[1px]" id="scroll" ref={scroll}></div>
			)}
		</>
	);
}
