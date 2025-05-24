import Filter from "./tasks/Filter";
import Search from "./Search";
import Bots from "./Bots";

export function DashBoard() {
    return (
        <div className="flex pt-12 flex-row h-full bg-violet-950">
            <Filter />
            <div className="flex flex-col w-full h-full mr-5 mb-10">
                <Search />
                <Bots />
            </div>
        </div>
    )
}