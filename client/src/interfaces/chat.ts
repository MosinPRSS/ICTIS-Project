export interface IMessage {
	id: number;
	session: string;
	role: string;
	name: string;
	avatar: File | null;
	content: string;
	timestamp: Date;
	eval_count: number;
}

export interface Chat {
	id: string;
	name: string;
	botId: string;
	messages: IMessage[];
	createdAt: string;
	updatedAt: string;
	isPinned: boolean;
}
