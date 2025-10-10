"use client";
import useSearchService from "@/api/search_service";
import {
	new_botIcon,
	ratingIcon,
	searchIcon,
	swapIcon,
	trendingIcon,
} from "@/assets/images/images";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Tags from "@/components/mainPage/Tags";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/entries";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const { searchBots } = useSearchService();
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const input = useRef<HTMLInputElement>(null);
	const { user } = useSelector((state: RootState) => state);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [next, setNext] = useState("b/search");
	const [bots, setBots] = useState<IBot[]>([]);
	const [reverse, setReverse] = useState(1);
	const [searchInput, setSearchInput] = useState("");

	async function getBots() {
		try {
			if (!next) {
				return;
			}

			setIsLoading(true);

			const data = await searchBots(
				next,
				searchInput,
				undefined,
				undefined,
				selectedCategory,
				reverse,
				selectedTags
			);

			setNext(data.next);
			setBots(bots.concat(data.results));
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		setNext("b/search");
		setBots([]);
		getBots();
	}, [selectedCategory, selectedTags, reverse, searchInput]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSearchInput(input.current?.value ?? "");
	}

	useEffect(() => {
		setUserDevice(windowWidth);
	}, [windowWidth]);

	function redirect(id: string) {
		router.push(`/bot/${id}`);
	}

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

	return (
		<div className="flex flex-col gap-5 p-10">
			<div
				className={`flex grow justify-between items-start w-full ${
					userDevice === "mobile" && "flex-col gap-5"
				}`}
			>
				<h1 className="playpen text-4xl text-white">
					Добро пожаловать{user.user && ", " + user.user.name}!
				</h1>
				<form
					id="search-form"
					action=""
					className={`flex ${
						userDevice === "tablet" &&
						"flex-col items-end space-y-3"
					} justify-end`}
					onSubmit={(event) => handleSubmit(event)}
				>
					<input
						ref={input}
						type="text"
						className="rounded-[5px] border-[1px] border-white p-2 text-white bg-transparent outline-none"
					/>
					<button className="border-[1px] border-white rounded-[5px] p-2 w-[42px] h-[42px] ml-3">
						<Image src={searchIcon} alt="search-icon" />
					</button>
				</form>
			</div>
			<Tags
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/>
			<div className="flex gap-3 text-white">
				<button
					onClick={() => setSelectedCategory(2)}
					className={`flex gap-3 min-w-fit py-2 px-3 border-1 border-white rounded-[7px] hover:scale-105 transition duration-100`}
				>
					<Image
						src={trendingIcon}
						alt="trending-icon"
						width={20}
						height={20}
					/>
					<p>Популярные</p>
				</button>
				<button
					onClick={() => setSelectedCategory(1)}
					className={`flex gap-3 min-w-fit py-2 px-3 border-1 border-white rounded-[7px] hover:scale-105 transition duration-100`}
				>
					<Image
						src={ratingIcon}
						alt="rating-icon"
						width={20}
						height={20}
					/>
					<p>Лучшие</p>
				</button>
				<button
					onClick={() => setSelectedCategory(3)}
					className={`flex gap-3 min-w-fit py-2 px-3 border-1 border-white rounded-[7px] hover:scale-105 transition duration-100`}
				>
					<Image
						src={new_botIcon}
						alt="new_bot-icon"
						width={20}
						height={20}
					/>
					<p>Новинки</p>
				</button>
				<button
					className={`border-1 border-white rounded-[7px] py-[5px] px-[7px] hover:scale-105 transition duration-[400ms] ${
						reverse && "rotate-180"
					}`}
					onClick={() => setReverse(Number(!reverse))}
				>
					<Image
						src={swapIcon}
						alt="swap-icon"
						width={30}
						height={30}
					/>
				</button>
			</div>
			<div className="flex gap-10 items-center flex-wrap mt-10">
				{bots &&
					bots.map((bot) => (
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
					<div
						className="w-full h-[1px]"
						id="scroll"
						ref={scroll}
					></div>
				)}
			</div>
		</div>
	);
}
