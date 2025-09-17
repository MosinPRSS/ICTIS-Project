import {
	blackThemeIcon,
	violetThemeIcon,
	greenThemeIcon,
} from "@/assets/images/images";

export const themes = {
	themes: {
		violet: {
			name: "Violet",
			src: violetThemeIcon,
			options: {
				background: "bg-violet-950",
				middleground: "bg-violet-900",
				text: "text-white",
				border: "border-white",
				elementBackground: "bg-violet-900/50",
			},
		},
		green: {
			name: "Green",
			src: greenThemeIcon,
			options: {
				background: "bg-green-950",
				middleground: "bg-green-900",
				text: "text-white",
				border: "border-white",
				elementBackground: "bg-green-900/50",
			},
		},
		black: {
			name: "Black",
			src: blackThemeIcon,
			options: {
				background: "bg-gray-950",
				middleground: "bg-gray-900",
				text: "text-white",
				border: "border-white",
				elementBackground: "bg-gray-900/50",
			},
		},
	},
};
