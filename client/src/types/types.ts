import { ReactNode } from "react";

export type UserContextType = {
  isReg: boolean;
  wantToReg: boolean;
  regFunc: (e: boolean) => void;
  wantRegFunc: (e: boolean) => void
};

export type UserIsRegisteredContextProps = {
  children: ReactNode;
};