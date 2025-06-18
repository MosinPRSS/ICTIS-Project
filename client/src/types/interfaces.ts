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
  id: number,
  name: string,
  description: string,
  author: string,
  promt: string,
  hello: string,
  scenario: string,
  isPublic: boolean,
  chatsCount: number,
  chats: string[],
  image: string,
  tags: string[],
  writeCount: number

}

export interface chatProps {
  chat: number,
  chatFunc: Dispatch<SetStateAction<number>>
}

export interface collapseProps {
    isCollapsed: boolean
    collapseFunc: Dispatch<React.SetStateAction<boolean>>
}