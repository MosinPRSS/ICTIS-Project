import Bots from "./Bots";
import CategoryFilter from "./CategoryFilter";
import {Categories} from "../utils/data";
import { useRegister } from "../context/UserIsRegisteredContext";

export function DashBoard() {
    const {theme} = useRegister()
    return (
        <div className={`flex pt-12 flex-row h-full ${theme.options.bgColor}`}>
            <CategoryFilter categories={Categories} selectedCategories={[]} />
            <div className="flex flex-col w-full h-full mr-5 mb-10">
                <Bots />
            </div>
        </div>
    )
}