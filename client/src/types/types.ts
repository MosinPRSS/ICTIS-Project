import { ReactNode } from "react";

export type ThemeOptions = {
  bgBorderColor: any;
  bgColor: string;
  bgColor2: string;
  bgColor3: string;
  textColor: string;
  textColor2: string;
  mgColor: string;
  hoverBgColor: string;
  hoverBgColor2: string;
  hoverTextColor: string;
  hoverTextColor2: string;
  hoverBorderColor: string;
  regBgColor: string;
  regTextColor: string;
  regHoverBgColor: string;
  regHoverTextColor: string;
  regButtonColor: string;
};

export type Theme = {
  theme: string;
  options: ThemeOptions;
};

export type UserContextType = {
  isReg: boolean;
  wantToReg: boolean;
  selected: string[];
  theme: Theme;
  isPalette: boolean;
  page: string;
  chat: number;
  isColapsible: boolean;
  userview: string;
  regFunc: (e: boolean) => void;
  wantRegFunc: (e: boolean) => void;
  selectFunc: (e: string[]) => void;
  themeFunc: (e: Theme) => void;
  paletteFunc: (e: boolean) => void;
  pageFunc: (e: string) => void;
  chatFunc: (e: number) => void;
  collapseFunc: (e: boolean) => void;
  setUserViewFunc: (e: string) => void;
};

export type UserIsRegisteredContextProps = {
  children: ReactNode;
};

export type ThemeIcons = [string, React.RefAttributes<SVGSVGElement>];

export type BotCategory = "popular" | "new";

export type SearchFilter = {
  searchTerm: string;
  selectedCategories: string[];
};