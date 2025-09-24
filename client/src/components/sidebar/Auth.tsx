import { Logo } from "@/assets/images/images";
import { auth } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { loginValidation, registrationValidation } from "@/utils/validation";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAuth } from "@/api/auth_service";
import { th } from "motion/react-client";

const Auth = ({ setOpenAuth }: Dispatch<SetStateAction<boolean>>) => {
	const [regOrLog, setROL] = useState<"reg" | "log">("log");
	const { login, register } = useAuth();

	const dispatch = useDispatch();

	const [nameInput, setNameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [submitPassword, setSubmitPassword] = useState("");

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	async function registrationFunc(event: MouseEvent) {
		try {
			event.preventDefault();

			if (
				!registrationValidation({
					name: nameInput,
					email: emailInput,
					password: passwordInput,
					submitPassword: submitPassword,
				})
			) {
				throw new Error("Invalid data");
			}
			if ((await register(nameInput, emailInput, passwordInput)) != 0) {
				throw new Error("Registration error");
			}

			dispatch(
				auth({
					name: nameInput,
					email: emailInput,
				})
			);

			handleClose();
		} catch (error) {
			console.log(error);
		}
	}

	async function loginFunc(event: MouseEvent) {
		try {
			event.preventDefault();

			if (
				!loginValidation({
					email: loginEmail,
					password: loginPassword,
				})
			) {
				throw new Error("Invalid data");
			}

			if ((await login(loginEmail, loginPassword)) != 0) {
				throw new Error("Login error");
			}

			dispatch(
				auth({
					name: loginEmail,
					email: loginEmail,
				})
			);

			handleClose();
		} catch (error) {
			console.log(error);
		}
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
					<Registration
						setNameInput={setNameInput}
						nameInput={nameInput}
						setEmailInput={setEmailInput}
						emailInput={emailInput}
						setPasswordInput={setPasswordInput}
						passwordInput={passwordInput}
						submitPassword={submitPassword}
						setSubmitPassword={setSubmitPassword}
						registrationFunc={registrationFunc}
						setROL={setROL}
					/>
				) : (
					<Login
						loginFunc={loginFunc}
						loginEmail={loginEmail}
						loginPassword={loginPassword}
						setLoginEmail={setLoginEmail}
						setLoginPassword={setLoginPassword}
						setROL={setROL}
					/>
				)}
			</div>
		</div>
	);
};

const Login = ({
	loginEmail,
	setLoginEmail,
	loginPassword,
	setLoginPassword,
	loginFunc,
	setROL,
}) => {
	return (
		<>
			<div className="flex flex-col gap-2 items-center justify-center w-full">
				<h1 className="text-2xl font-black">С возвращением!</h1>
				<h2>Войдите в свой аккаунт</h2>
			</div>
			<form className="flex flex-col gap-5 w-full">
				<div className="flex flex-col gap-2">
					<label htmlFor="mail">Почта</label>
					<input
						value={loginEmail}
						onInput={(e) => setLoginEmail(e.currentTarget.value)}
						type="email"
						id="mail"
						className="border-2 rounded-[6px] px-3 py-2"
						placeholder="Введите почту"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Пароль</label>
					<input
						value={loginPassword}
						onInput={(e) => setLoginPassword(e.currentTarget.value)}
						type="password"
						id="password"
						className="border-2 rounded-[6px] px-3 py-2"
						placeholder="Введите пароль"
					/>
				</div>
				<button
					type="submit"
					className="bg-violet-100 py-2 px-3 rounded-[10px] hover:bg-black hover:text-white duration-75"
					onClick={(e) => loginFunc(e)}
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
	);
};

const Registration = ({
	nameInput,
	setNameInput,
	emailInput,
	setEmailInput,
	passwordInput,
	setPasswordInput,
	submitPassword,
	setSubmitPassword,
	registrationFunc,
	setROL,
}) => {
	return (
		<>
			<div className="flex flex-col gap-2 items-center w-full text-center">
				<h1 className="text-2xl font-black w-fit">Добро пожаловать!</h1>
				<h2>Пройдите регистрацию</h2>
			</div>
			<form className="flex flex-col gap-5 w-full">
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Имя</label>
					<input
						value={nameInput}
						onInput={(e) => setNameInput(e.currentTarget.value)}
						type="text"
						id="name"
						className="border-2 rounded-[6px] px-3 py-2"
						placeholder="Придумайте себе имя"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="mail">Почта</label>
					<input
						value={emailInput}
						onInput={(e) => setEmailInput(e.currentTarget.value)}
						type="email"
						id="mail"
						className="border-2 rounded-[6px] px-3 py-2"
						placeholder="Введите почту"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Пароль</label>
					<input
						value={passwordInput}
						onInput={(e) => setPasswordInput(e.currentTarget.value)}
						type="password"
						id="password"
						className="border-2 rounded-[6px] px-3 py-2"
						placeholder="Придумайте пароль"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Пароль</label>
					<input
						value={submitPassword}
						onInput={(e) =>
							setSubmitPassword(e.currentTarget.value)
						}
						type="password"
						id="password"
						className="border-2 rounded-[6px] px-3 py-2"
						placeholder="Введите еще раз"
					/>
				</div>
				<button
					type="submit"
					className="bg-violet-100 py-2 px-3 rounded-[10px] hover:bg-black hover:text-white duration-75 w-full"
					onClick={(e) => registrationFunc(e)}
				>
					Регистрация
				</button>
				<div className="flex gap-3 justify-between items-center">
					<p>Есть аккаунт? </p>
					<button onClick={() => setROL("log")} className="underline">
						Войти
					</button>
				</div>
			</form>
		</>
	);
};

export default Auth;
