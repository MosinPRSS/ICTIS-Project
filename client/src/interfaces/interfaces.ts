import { Dispatch, SetStateAction } from "react";

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

export interface ITag {
	name: string;
	num_times: number;
}
