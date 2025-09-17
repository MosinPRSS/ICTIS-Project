import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IsOpen } from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "@/types/types";
import { themes } from "@/utils/themes";
import { RootState } from "@reduxjs/toolkit/query";
import { setTheme } from "@/store/slices/themeSlice";

const ThemesList = ({ isOpen, setOpen }: IsOpen) => {
	const [isThemesOpen, setThemesOpen] = useState(false);
	const { selectedTheme } = useSelector((state: RootState) => {
		return state;
	});

	const dispatch = useDispatch();
	const themesList = Object.values(themes.themes);

	useEffect(() => {
		setTimeout(() => {
			setThemesOpen(isOpen);
		}, 50);
	}, [isOpen]);

	function switchThemes(theme) {
		dispatch(setTheme({ theme: theme.name, options: theme.options }));

		setThemesOpen(!isThemesOpen);
		setOpen(false);
	}

	return (
		<motion.div
			id="themes-list"
			className={`${
				!isOpen && "hidden"
			} fixed bg-white rounded-[5px] p-3 flex flex-col space-y-2`}
			animate={
				isOpen
					? {
							width: "fit-content",
							height: "fit-content",
							x: "120%",
							y: "-50%",
					  }
					: {
							width: 0,
							height: 0,
							x: 0,
							y: 0,
					  }
			}
		>
			{isThemesOpen && (
				<>
					{themesList.map((theme: Theme) => (
						<button
							key={theme.name}
							className={`flex gap-10 rounded-[10px] p-2 hover:border-2 hover:border-black min-w-fit} ${
								theme.name === selectedTheme.theme &&
								"border-2 border-black bg-violet-100"
							}`}
							onClick={() => switchThemes(theme)}
						>
							<Image
								src={theme.src}
								alt={`${theme.name}-theme-icon`}
								width={25}
								height={25}
							/>
							<p>{theme.name}</p>
						</button>
					))}
				</>
			)}
		</motion.div>
	);
};

export default ThemesList;
