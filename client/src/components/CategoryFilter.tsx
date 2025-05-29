import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SmileIcon, X } from "lucide-react";
import { useRegister } from "../context/UserIsRegisteredContext";

interface Props {
  categories: string[];
}

const CategoryFilter: React.FC<Props> = ({ categories }) => {
  const {selected, selectFunc, theme} = useRegister()
  const [unselectedCategories, setUnselectedCategories] = useState<string[]>(categories.filter((c) => !selected.includes(c)))

  const onCategoryToggle = (category: string) => {
    selectFunc(prev => [...prev, category]);
    setUnselectedCategories(unselectedCategories.filter((e) => e != category))
  };

  const onCategoryRemove = (category: string) => {
    const findIndex = categories.findIndex((e) => e == category)
    const newUnselect = unselectedCategories
    newUnselect.splice(findIndex, 0, category)

    setUnselectedCategories(
      newUnselect
    )
    selectFunc((prev) => prev.filter((c) => c !== category));
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
                    <Input placeholder="Найти категорию" className={`${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} onChange={findCategory}/>
                    <div className="space-y-4">
                        {selected.length > 0 ? <Button className="border-1 rounded-sm cursor-pointer hover:bg-white hover:text-black" onClick={() => {selectFunc([]); setUnselectedCategories(categories)}}><X />Сбросить всё</Button> : <></>}
                        <div className="flex flex-wrap gap-2 border-b-1 pb-5">
                            {selected.map((category) => (
                            <span
                                key={category}
                                className={`${theme.options.regButtonColor} ${theme.options.regTextColor} px-3 py-1 rounded-full text-sm flex items-center gap-1`}
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
                            {unselectedCategories.length != 0 ? unselectedCategories.map((category) => (
                            <div
                                key={category}
                                className={`cursor-pointer border border-gray-300 px-3 py-1 rounded-full text-sm ${theme.options.hoverBgColor2} ${theme.options.textColor2} ${theme.options.regButtonColor} ${theme.options.hoverTextColor2} transition`}
                                onClick={() => onCategoryToggle(category)}
                            >
                                {category}
                            </div>
                            )) : <div>
                              <p>Ничего не найдено</p>
                              <SmileIcon />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
};
export default CategoryFilter
