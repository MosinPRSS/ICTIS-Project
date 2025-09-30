"use client";
import { initTheme } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = ({ children }) => {
	const { selectedTheme } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initTheme());
	}, []);

	return (
		<div className={`${selectedTheme.options.background} flex w-full`}>
			{children}
		</div>
	);
};

export default Wrapper;
