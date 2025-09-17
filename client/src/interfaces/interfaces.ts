import { Dispatch, SetStateAction } from "react";

export interface IUser {
	id: number;
	name: string;
	email: string;
	description: string;
	image: string;
	bots: IBot[];
	personas: IPersona[];
	createDate: Date;
}
export interface IBot {
	id: number;
	name: string;
	author: string;
	description: string;
	publicDescription: string;
	tags: string[];
	isPublic?: boolean;
}

export interface ISelectedBot extends IBot {
	setSelectedBot: Dispatch<SetStateAction<IBot | null>>;
}

export interface IPersona {
	id: number;
	name: string;
	author: string;
	description: string;
	tags: string[];
	link: string;
}

export interface IAuth {
	isAuth: boolean;
}

export interface ISelectedTheme {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IFindBot {
	setSelectedTags: Dispatch<SetStateAction<string[]>>;
	selectedTags: string[];
	findBots: string | null;
}
export interface IsOpen {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IValidateData {
	name: string;
	email: string;
	password: string;
	submitPassword: string;
}
