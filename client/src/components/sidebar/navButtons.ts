import { botIcon, personIcon, mailIcon } from "@/assets/images/images";

export const navButtons = [
	{ name: "bot", icon: botIcon, desc: "Ваши Боты", href: "/mybots" },
	{
		name: "person",
		icon: personIcon,
		desc: "Ваши Персоны",
		href: "/mypersonas",
	},
	{ name: "mail", icon: mailIcon, desc: "Чаты", href: "/chats" },
];
