import useTagsService from "@/api/tags_service";
import { IFindBot } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const Tags = ({ selectedTags, setSelectedTags }: IFindBot) => {
	const tagsFunc = useTagsService({ amount: 10 });
	const [tagsList, setTags] = useState<string[]>(["tag"]);

	useEffect(() => {
		(async function getTags() {
			const response = await tagsFunc.getPopularTags();

			if (!response) return;

			setTags(response);
		})();
	}, []);
	function addTag(tag: string) {
		setSelectedTags([...selectedTags, tag]);
		setTags(tagsList.filter((t) => t !== tag));
	}

	function removeTag(tag: string) {
		setSelectedTags(selectedTags.filter((t: string) => t !== tag));
		setTags([...tagsList, tag].sort());
	}

	return (
		<div className="flex gap-5 items-center flex-wrap">
			<button className="border-[1px] text-white hover:bg-white hover:text-black border-white rounded-[5px] py-2 px-5">
				Теги
			</button>
			{selectedTags &&
				selectedTags.map((tag: string) => (
					<button
						key={tag}
						className="border-[1px] text-white hover:bg-white hover:text-black border-white rounded-[5px] p-2 h-fit"
						onClick={() => removeTag(tag)}
					>
						{tag}
					</button>
				))}
			<div className="min-w-[1px] h-[50px] bg-white flex-wrap" />
			{tagsList.map((tag) => (
				<button
					key={tag}
					className="border-[1px] text-white hover:bg-white hover:text-black border-white rounded-[5px] p-2 h-fit"
					onClick={() => addTag(tag)}
				>
					{tag}
				</button>
			))}
		</div>
	);
};

export default Tags;
