// CategoryFilter.tsx
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FrownIcon, X } from "lucide-react";
import { useRegister } from "../context/UserIsRegisteredContext";

interface Props {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onCategoryRemove: (category: string) => void;
  onResetAll: () => void;
}

const CategoryFilter: React.FC<Props> = ({ 
  categories, 
  selectedCategories, 
  onCategoryToggle, 
  onCategoryRemove,
  onResetAll
}) => {
  const { theme } = useRegister();
  const [unselectedCategories, setUnselectedCategories] = useState<string[]>(
    categories.filter((c) => !selectedCategories.includes(c))
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === '') {
      setUnselectedCategories(categories.filter(c => !selectedCategories.includes(c)));
      return;
    }

    const filtered = categories
      .filter(c => c.toLowerCase().includes(value.toLowerCase()))
      .filter(c => !selectedCategories.includes(c));
    
    setUnselectedCategories(filtered);
  };

  return (
    <div className="hidden w-[230px] gap-1 p-6 md:flex">
      <div className="flex flex-col space-y-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight">Теги</h2>
        <Input 
          placeholder="Найти тег" 
          value={searchTerm}
          onChange={handleSearch}
          className={`${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}
        />
        <div className="space-y-4">
          {selectedCategories.length > 0 && (
            <Button 
              className="border-1 rounded-sm cursor-pointer hover:bg-white hover:text-black" 
              onClick={onResetAll}
            >
              <X />Сбросить всё
            </Button>
          )}
          
          <div className="flex flex-wrap gap-2 border-b-1 pb-5">
            {selectedCategories.map((category) => (
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
            {unselectedCategories.length > 0 ? (
              unselectedCategories.map((category) => (
                <div
                  key={category}
                  className={`cursor-pointer border border-gray-300 px-3 py-1 rounded-full text-sm ${theme.options.hoverBgColor2} ${theme.options.textColor2} ${theme.options.regButtonColor} ${theme.options.hoverTextColor2} transition`}
                  onClick={() => onCategoryToggle(category)}
                >
                  {category}
                </div>
              ))
            ) : (
              searchTerm && (
                <div className="flex items-center gap-2 text-gray-400">
                  <FrownIcon />
                  <p>Ничего не найдено</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryFilter;
