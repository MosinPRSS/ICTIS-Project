import { ReactNode } from "react";

export type UserContextType = {
  isReg: boolean,
  wantToReg: boolean,
  isSettings: boolean,
  isHelp: boolean,
  isAccount: boolean,
  selected: string[],
  theme: object,
  isPalette: boolean,
  regFunc: (e: boolean) => void,
  wantRegFunc: (e: boolean) => void,
  settingsFunc: (e: boolean) => void,
  helpFunc: (e: boolean) => void,
  selectFunc: (e: string[]) => void,
  accountFunc: (e: boolean) => void,
  themeFunc: (e: object) => void,
  paletteFunc: (e: boolean) => void
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

export type ThemeIcons = [string, React.RefAttributes<SVGSVGElement>]