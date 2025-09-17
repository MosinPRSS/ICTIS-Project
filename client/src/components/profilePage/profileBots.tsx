import { IBot } from "@/interfaces/interfaces";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const ProfileBots = (bots: IBot[]) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	return (
		<div className={`${selectedTheme.options.elementBackground}`}>{}</div>
	);
};

export default ProfileBots;
