import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface Props {
  categories: string[];
}

const CategoryFilter: React.FC<Props> = ({ categories }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [unselectedCategories, setUnselectedCategories] = useState<string[]>(categories.filter((c) => !selected.includes(c)))

  const onCategoryToggle = (category: string) => {
    setSelected(prev => [...prev, category]);
    setUnselectedCategories(unselectedCategories.filter((e) => e != category))
  };

  const onCategoryRemove = (category: string) => {
    const findIndex = unselectedCategories.findIndex((e) => e == category)
    const newUnselect = unselectedCategories
    newUnselect.splice(findIndex, 0, category)

    setUnselectedCategories(
      newUnselect
    )
    setSelected((prev) => prev.filter((c) => c !== category));
  };

  const findCategory = (event) => {
    const newValue = event.target.value

    if (newValue == '') {
      setUnselectedCategories(categories.filter((c) => !selected.includes(c)))
    }

    const find = categories.filter((e) => e.toLowerCase().includes(newValue) || e.toUpperCase().includes(newValue) || e.includes(newValue)).filter((e) => !selected.includes(e))
    setUnselectedCategories(find)
  }

  return (
          <>
            <div className="md:hidden">
            </div>
            <div className="hidden w-[230px] gap-1 p-6 md:flex">
                <div className="flex flex-col space-y-4 mb-4">
                    <h2 className="text-xl font-bold tracking-tight">Категории</h2>
                    <Input placeholder="Найти категорию" className="hover:bg-white hover:text-black" onChange={findCategory}/>
                    <div className="space-y-4">
                        {selected.length > 0 ? <Button className="border-1 rounded-sm cursor-pointer hover:bg-white hover:text-black" onClick={() => setSelected([])}><X />Сбросить всё</Button> : <></>}
                        <div className="flex flex-wrap gap-2 border-b-1 pb-5">
                            {selected.map((category) => (
                            <span
                                key={category}
                                className="bg-white text-black px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                                {category}
                                <X
                                    className="cursor-pointer backdrop-blur-xl h-4 w-4 border-1 rounded-4xl text-blue-600 hover:text-red-500"
                                    onClick={() => onCategoryRemove(category)}
                                />
                            </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {unselectedCategories.map((category) => (
                            <div
                                key={category}
                                className="cursor-pointer border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition"
                                onClick={() => onCategoryToggle(category)}
                            >
                                {category}
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
};
export default CategoryFilter