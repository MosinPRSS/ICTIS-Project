import { Logo } from "@/assets/images/images";
import { login } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import validation from "@/utils/validation";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Auth = ({ setOpenAuth }: Dispatch<SetStateAction<boolean>>) => {
	const [regOrLog, setROL] = useState<"reg" | "log">("log");

	const { user } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const nameInput = useRef(null);
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const submitPassword = useRef(null);

	function registration(event: MouseEvent) {
		const input = {
			name: nameInput.current.value,
			email: emailInput.current.value,
			password: passwordInput.current.value,
			submitPassword: submitPassword.current.value,
		};
		event.preventDefault();
		if (!validation(input)) return;

		dispatch(
			login({
				name: input.name,
				email: input.email,
				password: input.password,
			})
		);
		setOpenAuth(false);
	}
	function handleClose() {
		setOpenAuth(false);
	}
	return (
		<div className="flex justify-center items-center fixed left-0 top-0 w-full h-full backdrop-blur-3xl z-999">
			<div
				className={`flex relative flex-col items-center gap-5 bg-white p-10 rounded-[10px] text-black min-w-[25vw] w-fit`}
			>
				<button
					className="absolute right-5 top-5"
					onClick={handleClose}
				>
					X
				</button>
				<div className="flex items-center gap-2 text-3xl justify-center font-medium w-full">
					<div className="flex items-center justify-center rounded-md bg-primary text-primary-foreground">
						<Image src={Logo} alt="logo" className="w-10 h-10" />
					</div>
					<p>ARI-ai</p>
				</div>
				{regOrLog === "reg" ? (
					<>
						<div className="flex flex-col gap-2 items-center w-full text-center">
							<h1 className="text-2xl font-black w-fit">
								Добро пожаловать!
							</h1>
							<h2>Пройдите регистрацию</h2>
						</div>
						<form className="flex flex-col gap-5 w-full">
							<div className="flex flex-col gap-2">
								<label htmlFor="name">Имя</label>
								<input
									ref={nameInput}
									type="text"
									id="name"
									className="border-2 rounded-[6px] px-3 py-2"
									placeholder="Придумайте себе имя"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="mail">Почта</label>
								<input
									ref={emailInput}
									type="email"
									id="mail"
									className="border-2 rounded-[6px] px-3 py-2"
									placeholder="Введите почту"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="password">Пароль</label>
								<input
									ref={passwordInput}
									type="password"
									id="password"
									className="border-2 rounded-[6px] px-3 py-2"
									placeholder="Придумайте пароль"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="password">Пароль</label>
								<input
									ref={submitPassword}
									type="password"
									id="password"
									className="border-2 rounded-[6px] px-3 py-2"
									placeholder="Введите еще раз"
								/>
							</div>
							<button
								type="submit"
								className="bg-violet-100 py-2 px-3 rounded-[10px] hover:bg-black hover:text-white duration-75 w-full"
								onClick={(e) => registration(e)}
							>
								Регистрация
							</button>
							<div className="flex gap-3 justify-between items-center">
								<p>Есть аккаунт? </p>
								<button
									onClick={() => setROL("log")}
									className="underline"
								>
									Войти
								</button>
							</div>
						</form>
					</>
				) : (
					<>
						<div className="flex flex-col gap-2 items-center justify-center w-full">
							<h1 className="text-2xl font-black">
								С возвращением!
							</h1>
							<h2>Войдите в свой аккаунт</h2>
						</div>
						<form className="flex flex-col gap-5 w-full">
							<div className="flex flex-col gap-2">
								<label htmlFor="mail">Почта</label>
								<input
									type="email"
									id="mail"
									className="border-2 rounded-[6px] px-3 py-2"
									placeholder="Введите почту"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="password">Пароль</label>
								<input
									type="password"
									id="password"
									className="border-2 rounded-[6px] px-3 py-2"
									placeholder="Введите пароль"
								/>
							</div>
							<button
								type="submit"
								className="bg-violet-100 py-2 px-3 rounded-[10px] hover:bg-black hover:text-white duration-75"
							>
								Войти
							</button>
							<div className="flex gap-3 items-center justify-between">
								<p className="w-fit">Нет аккаунта? </p>
								<button
									onClick={() => setROL("reg")}
									className="underline w-fit cursor-pointer"
								>
									Регистрация
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default Auth;
