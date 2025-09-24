"use client";
import { auth } from "@/store/slices/userSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Content = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	(function logIn() {
		dispatch(auth(null));
	})();
	return (
		<div
			className={`max-h-[100vh] relative overflow-y-scroll w-full grow flex flex-col space-y-10`}
		>
			{children}
		</div>
	);
};

export default Content;
