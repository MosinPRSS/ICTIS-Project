import Bot from "./bot";

type Props = {
    isSidebarOpened: boolean;
};

export default function BotField({ isSidebarOpened }: Props) {
    const GetBots = () => {
        return Array.from({ length: 42 }, (_, i) => <Bot key={i} />);
    };

    return (
        <div className="relative h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-2">
                <div className="m-2 text-left text-sm text-gray-500">
                    Заглушка для страниц
                </div>

                <div
                    className={`
                        grid gap-4 transition-all duration-300
                        ${
                            isSidebarOpened
                                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]'
                                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]'
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
