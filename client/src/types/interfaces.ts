import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}
export interface bot {
    name: string
    id: string
    description: string
    author: string
    image: string
    chatsCount: number
    tags: string[]
}

export interface bot {
  promt: string,
  hello: string,
  scenario: string,
  isPublic: boolean,
}

export interface chatProps {
  chat: number,
  chatFunc: Dispatch<SetStateAction<number>>
}