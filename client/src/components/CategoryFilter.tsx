// CategoryFilter.tsx
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FrownIcon, X } from "lucide-react";
import { useRegister } from "../context/Context";
import { CategoryFilterProps } from "../types/interfaces";

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
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

  const themeOptions = theme?.options || {};

  return (
    <div className={`w-full lg:w-[230px] gap-1 p-3 sm:p-4 lg:p-6 flex flex-col`}>
      <div className="flex flex-col space-y-3 sm:space-y-4 mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white">Теги</h2>
        <Input 
          placeholder="Найти тег" 
          value={searchTerm}
          onChange={handleSearch}
          className={`${themeOptions.hoverBgColor || 'bg-gray-800'} ${themeOptions.hoverTextColor || 'text-white'}`}
        />
        <div className="space-y-3 sm:space-y-4">
          {selectedCategories.length > 0 && (
            <Button 
              className="border-1 rounded-sm cursor-pointer hover:bg-white hover:text-black w-full lg:w-auto text-sm sm:text-base" 
              onClick={onResetAll}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="ml-1">Сбросить всё</span>
            </Button>
          )}
          
          <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-600 pb-3 sm:pb-5">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className={`${themeOptions.regButtonColor || 'bg-purple-100'} ${themeOptions.regTextColor || 'text-black'} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1`}
              >
                {category}
                <X
                  className="cursor-pointer backdrop-blur-xl h-3 w-3 sm:h-4 sm:w-4 border-1 rounded-4xl text-blue-600 hover:text-red-500"
                  onClick={() => onCategoryRemove(category)}
                />
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {unselectedCategories.length > 0 ? (
              unselectedCategories.map((category) => (
                <div
                  key={category}
                  className={`cursor-pointer border border-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${themeOptions.hoverBgColor2 || 'hover:bg-black'} ${themeOptions.textColor2 || 'text-black'} ${themeOptions.regButtonColor || 'bg-purple-100'} ${themeOptions.hoverTextColor2 || 'hover:text-white'} transition`}
                  onClick={() => onCategoryToggle(category)}
                >
                  {category}
                </div>
              ))
            ) : (
              searchTerm && (
                <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                  <FrownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
