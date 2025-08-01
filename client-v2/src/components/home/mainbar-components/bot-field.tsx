// BotField.js
import { useState, useEffect } from "react";
import Bot from "./bot";
import TagButton from "./tag_button";
import useTagsService from "../../../api/tags_service"

type Props = {
    isSidebarOpened: boolean;
    onOpenAuth: (method: string) => void;
};

export default function BotField({ isSidebarOpened, onOpenAuth }: Props) {
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [tags, setTags] = useState<Array<{ name: string; num_times: number }>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { getPopularTags } = useTagsService({ amount: 10 });

    useEffect(() => {
        const loadTags = async () => {
            setLoading(true);
            const fetchedTags = await getPopularTags();
            setTags(fetchedTags);
            setLoading(false);
        };

        loadTags();
    }, []);

    const handleTagClick = (tagName: string) => {
        setSelectedTags((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(tagName)) {
                newSet.delete(tagName);
            } else {
                newSet.add(tagName);
            }
            return newSet;
        });
    };

    const GetBots = () => {
        return Array.from({ length: 42 }, (_, i) => (
            <Bot key={i} onOpenAuth={onOpenAuth} />
        ));
    };

    return (
        <div className="relative h-full flex flex-col overflow-hidden">
            <div className="overflow-y-auto p-2">
                {/* Блок с тегами */}
                <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Теги</h3>

                    {loading ? (
                        <div className="flex gap-2 min-w-max">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-24 h-8 bg-gray-200 rounded-md animate-pulse"
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            className="w-full overflow-x-auto overflow-y-hidden pb-1.5 hide-scrollbar"
                            onWheel={(e) => {
                                e.preventDefault();
                                e.currentTarget.scrollLeft += e.deltaY * 2;
                            }}
                        >
                            <div className="flex flex-nowrap gap-2 min-w-max">
                                {tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <div key={tag.name} className="flex-shrink-0">
                                            <TagButton
                                                name={tag.name}
                                                amount={tag.num_times}
                                                isClicked={selectedTags.has(tag.name)}
                                                onClick={() => handleTagClick(tag.name)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Нет доступных тегов</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="m-2 text-left text-sm text-gray-500">
                    Заглушка для страниц
                </div>

                <div
                    className={`
                        grid gap-4 transition-all duration-300
                        ${
                            isSidebarOpened
                                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]"
                                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]"
                        }
                    `}
                >
                    {GetBots()}
                </div>

                <div className="m-2 text-right text-sm text-gray-500">
                    Заглушка для страниц
                </div>
            </div>
        </div>
    );
}