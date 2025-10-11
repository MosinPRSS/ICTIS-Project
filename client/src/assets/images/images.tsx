import Logo from "./logo.svg";
import collapseIcon from "./collapse-icon.svg";
import questionIcon from "./question-icon.svg";
import violetThemeIcon from "./violet-theme-icon.svg";
import redThemeIcon from "./red-theme-icon.svg";
import addIcon from "./plus-icon.svg";
import editIcon from "./edit-icon.svg";
import closeIcon from "./close-icon.svg";
import uploadIcon from "./upload-icon.svg";
import infoIcon from "./info-icon.svg";
import settingsIcon from "./settings-icon.svg";
import leftIcon from "./left-icon.svg";
import cancelIcon from "./cancel-icon.svg";
import sendIcon from "./send-icon.svg";
import clockIcon from "./clock-icon.svg";
import errorIcon from "./error-icon.svg";
import deleteIcon from "./delete-icon.svg";
import okIcon from "./ok-icon.svg";
import copyIcon from "./copy-icon.svg";

const ExitIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="min-w-[24px] min-h-[24px] cursor-pointer group-hover:fill-black"
		>
			<path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z" />
		</svg>
	);
};

const QuestionIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="min-w-[24px] min-h-[24px] cursor-pointer z-20 group-hover:fill-black duration-350 transition-colors ease-in-out"
		>
			<path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Zm440 240q21 0 35.5-14.5T530-290q0-21-14.5-36T480-341q-21 0-35.5 14.5T430-291q0 21 14.5 36t35.5 15Zm-36-152h73q0-36 8.5-54t34.5-44q35-35 46.5-56.5T618-598q0-56-40-89t-98-33q-50 0-86 26t-52 74l66 28q7-26 26.5-43t45.5-17q27 0 45.5 15.5T544-595q0 17-8 34t-34 40q-33 29-45.5 56.5T444-392Z" />
		</svg>
	);
};

const ThemesIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="min-w-[24px] min-h-[24px] cursor-pointer z-20 group-hover:fill-black duration-350 transition-colors ease-in-out"
		>
			<path d="M396-396q-32-32-58.5-67T289-537q-5 14-6.5 28.5T281-480q0 83 58 141t141 58q14 0 28.5-2t28.5-6q-39-22-74-48.5T396-396Zm57-56q51 51 114 87.5T702-308q-40 51-98 79.5T481-200q-117 0-198.5-81.5T201-480q0-65 28.5-123t79.5-98q20 72 56.5 135T453-452Zm290 72q-20-5-39.5-11T665-405q8-18 11.5-36.5T680-480q0-83-58.5-141.5T480-680q-20 0-38.5 3.5T405-665q-8-19-13.5-38T381-742q24-9 49-13.5t51-4.5q117 0 198.5 81.5T761-480q0 26-4.5 51T743-380ZM440-840v-120h80v120h-80Zm0 840v-120h80V0h-80Zm323-706-57-57 85-84 57 56-85 85ZM169-113l-57-56 85-85 57 57-85 84Zm671-327v-80h120v80H840ZM0-440v-80h120v80H0Zm791 328-85-85 57-57 84 85-56 57ZM197-706l-84-85 56-57 85 85-57 57Zm199 310Z" />
		</svg>
	);
};

const ChatIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="min-w-[24px] min-h-[24px] cursor-pointer z-20 group-hover:fill-black duration-350 transition-colors ease-in-out"
		>
			<path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
		</svg>
	);
};

const BotIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="min-w-[24px] min-h-[24px] cursor-pointer z-20 group-hover:fill-black duration-350 transition-colors ease-in-out"
		>
			<path d="M160-160q0-75 41-134.5T307-381l-10-99H160v-240H40v-80h320v80H240v160h48l-8-80h400l-8 80h48v-160H600v-80h321v80H801v240H664l-10 99q65 27 105.5 86.5T800-160h-80q0-66-47-113t-113-47H400q-66 0-113 47t-47 113h-80Zm225-240h189l17-160H368l17 160Zm0 0h189-189Z" />
		</svg>
	);
};

const PersonaIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="cursor-pointer z-20 group-hover:fill-black duration-350 transition-colors ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
		</svg>
	);
};

const PopularIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="cursor-pointer z-20 transition-transform transform-gpu group-hover:fill-green-500 group:hover-scale-110 duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
		</svg>
	);
};

const StarIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="cursor-pointer z-20 transition-transform transform-gpu group-hover:fill-yellow-200 group:hover-scale-110 duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="M480-644v236l96 74-36-122 90-64H518l-38-124ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
		</svg>
	);
};

const PlusIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="cursor-pointer z-20 transition-transform transform-gpu group-hover:fill-green-500 group:hover-scale-110 duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
		</svg>
	);
};

const SwapIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="cursor-pointer z-20 transition-transform transform-gpu group-hover:fill-black group:hover-scale-110 duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />
		</svg>
	);
};

const SearchIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="cursor-pointer z-20 transition-transform transform-gpu group-hover:fill-black group:hover-scale-110 duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
		</svg>
	);
};

const RightIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="rotate-[-45deg] cursor-pointer z-20 transform duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
		</svg>
	);
};

const LeftIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#FFFFFF"
			className="rotate-[-45deg] cursor-pointer z-20 group-hover:left-[-15%] transform duration-350 ease-in-out min-w-[24px] min-h-[24px]"
		>
			<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
		</svg>
	);
};

export {
	LeftIcon,
	RightIcon,
	SwapIcon,
	redThemeIcon,
	copyIcon,
	okIcon,
	deleteIcon,
	BotIcon,
	Logo,
	ChatIcon,
	PersonaIcon,
	collapseIcon,
	questionIcon,
	QuestionIcon,
	ExitIcon,
	ThemesIcon,
	violetThemeIcon,
	SearchIcon,
	addIcon,
	editIcon,
	closeIcon,
	uploadIcon,
	StarIcon,
	PlusIcon,
	PopularIcon,
	infoIcon,
	settingsIcon,
	leftIcon,
	cancelIcon,
	sendIcon,
	clockIcon,
	errorIcon,
};
