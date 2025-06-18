import { ReactNode } from "react";

export type UserContextType = {
  isReg: boolean,
  wantToReg: boolean,
  selected: string[],
  theme: object,
  isPalette: boolean,
  page: string,
  chat: number,
  isColapsible: boolean,
  userview: string,
  regFunc: (e: boolean) => void,
  wantRegFunc: (e: boolean) => void,
  selectFunc: (e: string[]) => void,
  themeFunc: (e: object) => void,
  paletteFunc: (e: boolean) => void,
  pageFunc: (e: string) => void,
  chatFunc: (e: number) => void,
  collapseFunc: (e: boolean) => void,
  setUserViewFunc: (e: string) => void
};

export type UserIsRegisteredContextProps = {
  children: ReactNode;
};

export type CategoryFilterProps = {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onCategoryRemove: (category: string) => void;
};

export type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
};

export type ThemeIcons = [string, React.RefAttributes<SVGSVGElement>]