import Bots from "./Bots";
import CategoryFilter from "./CategoryFilter";
import {Categories, BotsData} from "../utils/data";

export function DashBoard() {
    return (
        <div className="flex pt-12 flex-row h-full bg-violet-950">
            <CategoryFilter categories={Categories} selectedCategories={[]} />
            <div className="flex flex-col w-full h-full mr-5 mb-10">
                <Bots bots={BotsData}/>
            </div>
        </div>
    )
}