import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Search() {
    return (
        <div className="pt-8 space-y-2 h w-full mr-10 h-30">
            <h2 className="text-xl font-bold tracking-tight mb-4">Поиск</h2>
            <div className="flex flex-row gap-2">
                <Button variant={"outline"} className="cursor-pointer">
                    <SearchIcon />
                </Button>
                <Input placeholder="Найти персонажа" />
            </div>
        </div>
    )
}