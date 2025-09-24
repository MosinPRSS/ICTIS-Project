import { motion } from "motion/react";
import React from "react";

const Loading = () => {
	return (
		<motion.div
			className="w-[50px] h-[50px] border-8 border-dotted border-white rounded-full fixed top-1/2 left-1/2"
			animate={{ rotate: 360 }}
			transition={{
				duration: 2,
				repeat: Infinity,
				type: "spring",
			}}
		/>
	);
};

export default Loading;
