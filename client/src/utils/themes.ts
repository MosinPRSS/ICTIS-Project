import { redThemeIcon, violetThemeIcon } from "@/assets/images/images";

export const themes = {
	themes: {
		violet: {
			name: "Violet",
			src: violetThemeIcon,
			options: {
				background: "bg-gradient-to-r from-[#7F6AAD] to-[#5F4B8B]",
				middleground: "bg-gradient-to-r from-[#7F6AAD] to-[#816e9f]",
				text: "text-white",
				border: "border-white",
				elementBackground:
					"bg-gradient-to-r from-[#7F6AAD] to-[#ac94b4]",
				elementOpacity: "bg-white/10",
				focusBorder: "focus:border-violet-500",
			},
		},
		green: {
			name: "Red",
			src: redThemeIcon,
			options: {
				background: "bg-gradient-to-r from-[#b01633] to-[#7a0a1a]",
				middleground: "bg-gradient-to-r from-[#7b0210] to-[#7a0a1a]",
				text: "text-white",
				border: "border-white",
				elementBackground:
					"bg-gradient-to-r from-[#b01633] to-[#7b0210]",
				elementOpacity: "bg-white/10",
				focusBorder: "focus:border-red-500",
			},
		},
	},
};
