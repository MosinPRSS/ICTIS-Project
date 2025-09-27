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
	id?: number | Date | string;
	name?: string;
	chatname?: string;
	description?: string;
	public_description?: string;
	first_message?: string;
	scenario?: string;

	avatar?: File | null;

	is_public?: boolean | false;
	hide_info?: boolean | false;

	tags?: string[];
}

export interface ISelectedBot extends IBot {
	setSelectedBot: Dispatch<SetStateAction<IBot | null>>;
}

export interface IPersona {
	id: Date | number;
	name?: string;
	description?: string;
	avatar?: File | null;
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

export interface IRegisterValidateData {
	nameInput: string;
	emailInput: string;
	passwordInput: string;
	submitPasswordInput: string;
}
export interface ILoginValidateData {
	emailInput: string;
	passwordInput: string;
}
export interface Message {
	id: string;
	content: string;
	isBot: boolean;
	timestamp: string;
}

export interface Chat {
	id: string;
	name: string;
	botId: string;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
	isPinned: boolean;
}
