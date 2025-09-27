import { closeMessage } from "@/store/slices/messageSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { motion } from "motion/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Message = () => {
	const { message, selectedTheme } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(closeMessage());
		}, 10000);
	});
	return (
		<motion.div
			className={`flex justify-between gap-3 fixed right-5 bottom-5 rounded-xl border-[1px] p-3 ${selectedTheme.options.border} ${selectedTheme.options.background}`}
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
			transition={{ duration: 0.4, type: "spring" }}
		>
			<p>{message.text}</p>
			<button onClick={() => dispatch(closeMessage())}>X</button>
		</motion.div>
	);
};

export default Message;
