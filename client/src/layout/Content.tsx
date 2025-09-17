"use client";
import { login } from "@/store/slices/userSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Content = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	(function logIn() {
		dispatch(login(null));
	})();
	return (
		<div
			className={`max-h-[100vh] relative overflow-y-scroll w-full p-10 grow flex flex-col space-y-10`}
		>
			{children}
		</div>
	);
};

export default Content;
