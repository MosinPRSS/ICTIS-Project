"use client";
import { useEffect, useState } from "react";

export const useWindow = () => {
	const [deviceType, setDeviceType] = useState<
		"mobile" | "tablet" | "desktop"
	>("desktop");

	useEffect(() => {
		const handleResize = () => {
			setDeviceType(
				window.innerWidth < 768
					? "mobile"
					: window.innerWidth < 1024
					? "tablet"
					: "desktop"
			);
		};

		// Устанавливаем начальное значение сразу
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return deviceType;
};

export const useWindowWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
};
