"use client";
import useSearchService from "@/api/search_service";
import {
	PlusIcon,
	StarIcon,
	SearchIcon,
	SwapIcon,
	PopularIcon,
} from "@/assets/images/images";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Tags from "@/components/mainPage/Tags";
import { useWindow } from "@/hooks/window";
import { IBot } from "@/interfaces/entries";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
	const windowWidth = useWindow();
	const [userDevice, setUserDevice] = useState(windowWidth);
	const { searchBots } = useSearchService();
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
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

			console.log(
				next,
				searchInput,
				selectedCategory,
				selectedTags,
				reverse
			);

			const data = await searchBots(
				next,
				searchInput,
				undefined,
				undefined,
				selectedCategory,
				reverse,
				selectedTags
			);

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
		setNext("b/search");
		setBots([]);
		getBots();
	}, [selectedCategory, selectedTags, reverse]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setNext("b/search");
		setBots([]);
		getBots();
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
						value={searchInput}
						onChange={(event) => setSearchInput(event.target.value)}
						type="text"
						className={`focus:bg-white/10 transition duration-350 rounded-[5px] border-[1px] border-white p-2 text-white bg-transparent outline-none`}
					/>
					<button className="border-[1px] group hover:bg-white transition duration-350 border-white rounded-[5px] p-2 w-[42px] h-[42px] ml-3">
						<SearchIcon />
					</button>
				</form>
			</div>
			<Tags
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/>
			<div className="flex gap-3 text-white flex-wrap">
				<button
					onClick={() => setSelectedCategory(2)}
					className={`flex group gap-3 min-w-fit py-2 px-3 border-1 border-white rounded-[7px] hover:scale-105 hover:bg-white hover:text-black transition duration-350`}
				>
					<div className="group-hover:scale-200 transition duration-350">
						<PopularIcon />
					</div>
					<p>Популярные</p>
				</button>
				<button
					onClick={() => setSelectedCategory(1)}
					className={`flex group gap-3 min-w-fit py-2 px-3 border-1 border-white rounded-[7px] hover:scale-105 hover:bg-white hover:text-black transition duration-350`}
				>
					<div className="group-hover:scale-200 transition duration-350">
						<StarIcon />
					</div>
					<p>Лучшие</p>
				</button>
				<button
					onClick={() => setSelectedCategory(3)}
					className={`group flex gap-3 min-w-fit py-2 px-3 border-1 border-white rounded-[7px] hover:scale-105 hover:bg-white hover:text-black transition duration-350`}
				>
					<div className="group-hover:scale-200 group-hover:rotate-180 transition duration-350">
						<PlusIcon />
					</div>
					<p>Новинки</p>
				</button>

				<button
					className={`border-1 group border-white rounded-[7px] py-[5px] px-[7px] hover:scale-105 hover:bg-white transition duration-350 ${
						reverse && "rotate-180"
					}`}
					onClick={() => setReverse(Number(!reverse))}
				>
					<SwapIcon />
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
