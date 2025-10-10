import { uploadIcon } from "@/assets/images/images";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ROOT_URL } from "@/types/defaultImageSrc";
import { openMessage } from "@/store/slices/messageSlice";
import { useDispatch } from "react-redux";

const AvatarChange = ({ Info, setInfo }) => {
	const avatarRef = React.useRef<HTMLInputElement>(null);
	const [avatar, setAvatar] = useState<string | null>(null);
	const dispatch = useDispatch();

	function avatarChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			if (file.size > 5 * 1024 * 1024) {
				dispatch(openMessage("Размер файла не должен превышать 5 МБ"));
				return;
			}

			reader.onload = () => {
				setInfo((prev) => ({
					...prev,
					avatar: file,
				}));
				setAvatar(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	return (
		<form className="group relative cursor-pointer w-full h-full border-3 border-white/30 bg-white/10 rounded-2xl ">
			<label
				htmlFor="avatar"
				className="absolute z-10 inset-0 flex items-center justify-center bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Image
					src={uploadIcon}
					alt="upload-icon"
					width={50}
					height={50}
					draggable={false}
				/>
			</label>
			<Image
				src={
					avatar
						? avatar
						: Info.avatar.startsWith("http")
						? Info.avatar
						: ROOT_URL + Info.avatar
				}
				alt="avatar"
				width={120}
				height={120}
				className="rounded-2xl border-3 w-full h-full border-white/30 bg-white/10 transition-all duration-500"
			/>

			<input
				ref={avatarRef}
				className="absolute top-0 left-0 opacity-0 cursor-pointer z-20 w-full h-full transition-all duration-500"
				type="file"
				id="avatar"
				accept="image/*"
				onChange={(event) => avatarChange(event)}
			/>
		</form>
	);
};

export default AvatarChange;
