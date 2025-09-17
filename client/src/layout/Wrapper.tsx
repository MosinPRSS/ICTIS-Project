"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const Wrapper = ({ children }) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	return (
		<div className={`${selectedTheme.options.background} flex w-full`}>
			{children}
		</div>
	);
};

export default Wrapper;
