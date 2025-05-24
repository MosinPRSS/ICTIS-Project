import { ReactNode } from "react";

export type UserContextType = {
  isReg: boolean,
  wantToReg: boolean,
  isSettings: boolean,
  isHelp: boolean,
  regFunc: (e: boolean) => void,
  wantRegFunc: (e: boolean) => void,
  settingsFunc: (e: boolean) => void,
  helpFunc: (e: boolean) => void
};

export type UserIsRegisteredContextProps = {
  children: ReactNode;
};