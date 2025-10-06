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

export interface IPersona {
	id: Date | number;
	name?: string;
	description?: string;
	avatar?: File | null;
}

export interface ISelectedBot extends IBot {
	setSelectedBot: Dispatch<SetStateAction<IBot | null>>;
}
