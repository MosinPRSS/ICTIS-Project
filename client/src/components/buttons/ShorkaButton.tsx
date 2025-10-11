import React from "react";

const ShorkaButton = ({ func, arg, children }) => {
	return (
		<button
			onClick={() => func((arg) => !arg)}
			className={`w-full group relative hover:text-black duration-350 ease-in-out flex items-center text-white transition duration-10 p-3 space-x-1 rounded-xs`}
		>
			{children}
			<div className="absolute z-0 rounded-r-[10px] inset-0 w-0 bg-white transition-all duration-350 ease-in-out group-hover:w-full" />
		</button>
	);
};

export default ShorkaButton;
