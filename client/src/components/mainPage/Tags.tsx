import useTagsService from "@/api/tags_service";
import { IFindBot, ITag } from "@/interfaces/interfaces";
import { openMessage } from "@/store/slices/messageSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Tags = ({ selectedTags, setSelectedTags }: IFindBot) => {
	const { getPopularTags } = useTagsService();
	const dispatch = useDispatch();
	const [tagsList, setTags] = useState<ITag[]>([]);

	useEffect(() => {
		(async function getTags() {
			try {
				const response = await getPopularTags(10);

				if (!response) {
					throw new Error("Failed to get tags");
				}
				setTags(response);
			} catch (error) {
				dispatch(openMessage("Произошла ошибка при получении тегов"));
				console.log(error);
			}
		})();
	}, []);
	function addTag(tag: ITag) {
		setSelectedTags([...selectedTags, tag]);
		setTags(
			tagsList
				.filter((t) => t.name !== tag.name)
				.sort((a: ITag, b: ITag) => b.name.localeCompare(a.name))
		);
	}

	function removeTag(tag: ITag) {
		setSelectedTags(selectedTags.filter((t: ITag) => t.name !== tag.name));
		setTags([...tagsList, tag].sort());
	}

	return (
		<div className="flex gap-5 items-center flex-wrap">
			<button className="border-[1px] text-white hover:bg-white hover:text-black border-white rounded-[5px] py-2 px-5">
				Теги
			</button>
			{selectedTags &&
				selectedTags.map((tag: ITag) => (
					<button
						key={tag.name}
						className="border-[1px] text-white hover:bg-white hover:text-black border-white rounded-[5px] p-2 h-fit"
						onClick={() => removeTag(tag)}
					>
						{tag.name}
					</button>
				))}
			<div className="min-w-[1px] h-[50px] bg-white flex-wrap" />
			{tagsList.map((tag) => (
				<button
					key={tag.name}
					className="border-[1px] text-white hover:bg-white hover:text-black border-white rounded-[5px] p-2 h-fit"
					onClick={() => addTag(tag)}
				>
					{tag.name}
				</button>
			))}
		</div>
	);
};

export default Tags;
