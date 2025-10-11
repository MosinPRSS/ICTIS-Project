import { Logo } from "@/assets/images/images";
import { auth, showAuth } from "@/store/slices/userSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/api/auth_service";
import { useValidate } from "@/hooks/validate";
import usePersonaService from "@/api/persona_service";
import { motion } from "motion/react";

const Auth = () => {
	const [regOrLog, setROL] = useState<"reg" | "log">("log");
	const { login, register } = useAuth();
	const { createPersona } = usePersonaService();

	const [codeErrors, setCodeErrors] = useState<number[]>([]);
	const { registrationValidation, loginValidation } = useValidate();
	const [authError, setAuthError] = useState<null | string>(null);

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
			const { isValidate, codeError } = registrationValidation({
				nameInput: nameInput,
				emailInput: emailInput,
				passwordInput: passwordInput,
				submitPasswordInput: submitPassword,
			});

			if (!isValidate) {
				setCodeErrors(codeError);
				throw new Error("Invalid data");
			}

			const response = await register(
				nameInput,
				emailInput,
				passwordInput
			);

			if (response != "Успешно") {
				setAuthError(
					response === -1 ? "Ошибка при регистрации" : response
				);
				throw new Error("Registration error");
			}
			await login(emailInput, passwordInput);

			const username = localStorage.getItem("username");
			const userID = localStorage.getItem("userID");
			const avatarUrl = localStorage.getItem("avatarUrl");

			dispatch(
				auth({
					id: userID,
					name: username,
					avatar: avatarUrl,
				}),
				showAuth(false)
			);

			await createPersona({
				name: username,
				description: `Привет, меня зовут ${username}`,
			});
			handleClose();
		} catch (error) {
			console.log(error);
		}
	}

	async function loginFunc(event: MouseEvent) {
		try {
			event.preventDefault();
			const { isValidate, codeError } = loginValidation({
				emailInput: loginEmail,
				passwordInput: loginPassword,
			});

			if (!isValidate) {
				setCodeErrors(codeError);
				throw new Error("Invalid data");
			}

			const response = await login(loginEmail, loginPassword);

			if (response != 200) {
				throw new Error("Login error");
			}

			const username = localStorage.getItem("username");
			const userID = localStorage.getItem("userID");
			const avatarUrl = localStorage.getItem("avatarUrl");

			dispatch(
				auth({
					id: userID,
					name: username,
					avatarUrl: avatarUrl,
				}),
				showAuth(false)
			);

			handleClose();
		} catch (error) {
			setAuthError("Пользователь не найден");
			console.log(error);
		}
	}

	function handleClose() {
		dispatch(showAuth(false));
	}

	function resetCodeError(code: number) {
		if (codeErrors.includes(code)) {
			setCodeErrors(codeErrors.filter((el) => el !== code));
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			className="flex justify-center items-center fixed left-0 top-0 w-full h-full backdrop-blur-3xl z-999"
		>
			<div
				className={`flex relative flex-col items-center gap-5 bg-white p-10 rounded-[10px] text-black min-w-[25vw] w-fit max-w-[95vw]`}
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
						codeErrors={codeErrors}
						resetCodeError={resetCodeError}
						authError={authError}
						setAuthError={setAuthError}
						setCodeErrors={setCodeErrors}
					/>
				) : (
					<Login
						loginFunc={loginFunc}
						loginEmail={loginEmail}
						loginPassword={loginPassword}
						setLoginEmail={setLoginEmail}
						setLoginPassword={setLoginPassword}
						setROL={setROL}
						codeErrors={codeErrors}
						resetCodeError={resetCodeError}
						authError={authError}
						setAuthError={setAuthError}
						setCodeErrors={setCodeErrors}
					/>
				)}
			</div>
		</motion.div>
	);
};

const Login = ({
	loginEmail,
	setLoginEmail,
	loginPassword,
	setLoginPassword,
	loginFunc,
	setROL,
	codeErrors,
	resetCodeError,
	authError,
	setAuthError,
	setCodeErrors,
}) => {
	function resetError(num: number) {
		resetCodeError(num);
		setAuthError(null);
	}
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
						className={`border-2 ${
							codeErrors.includes(102) && "border-red-500"
						} rounded-[6px] px-3 py-2`}
						placeholder="Введите почту"
						onFocus={() => resetError(102)}
					/>
					{codeErrors.includes(102) && (
						<p className="text-red-500">Заполните поле</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Пароль</label>
					<input
						value={loginPassword}
						onInput={(e) => setLoginPassword(e.currentTarget.value)}
						type="password"
						id="password"
						className={`border-2 ${
							codeErrors.includes(103) && "border-red-500"
						} rounded-[6px] px-3 py-2`}
						placeholder="Введите пароль"
						onFocus={() => resetError(103)}
					/>
					{codeErrors.includes(103) && (
						<p className="text-red-500">Заполните поле</p>
					)}
				</div>
				{authError && <p className="text-red-500">{authError}</p>}
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
						onClick={() => {
							setROL("reg");
							setAuthError(null);
							setCodeErrors([]);
						}}
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
	codeErrors,
	resetCodeError,
	authError,
	setAuthError,
	setCodeErrors,
}) => {
	function resetError(num: number) {
		resetCodeError(num);
		setAuthError(null);
	}

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
						className={`border-2 rounded-[6px] px-3 py-2 ${
							codeErrors.includes(101) && "border-red-500"
						}`}
						onFocus={() => resetError(101)}
						placeholder="Придумайте себе имя"
					/>
					{codeErrors.includes(101) && (
						<p className="text-red-500">Заполните поле</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="mail">Почта</label>
					<input
						value={emailInput}
						onInput={(e) => setEmailInput(e.currentTarget.value)}
						type="email"
						id="mail"
						className={`border-2 rounded-[6px] px-3 py-2 ${
							(codeErrors.includes(102) ||
								codeErrors.includes(121)) &&
							"border-red-500"
						}`}
						onFocus={() => {
							resetError(102);
							resetError(121);
						}}
						placeholder="Введите почту"
					/>
					{codeErrors.includes(102) && (
						<p className="text-red-500">Заполните поле</p>
					)}
					{codeErrors.includes(121) && (
						<p className="text-red-500">
							Почта должна соответствовать формату: example@ex.com
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Пароль</label>
					<input
						value={passwordInput}
						onInput={(e) => setPasswordInput(e.currentTarget.value)}
						type="password"
						id="password"
						className={`border-2 rounded-[6px] px-3 py-2 ${
							(codeErrors.includes(103) ||
								codeErrors.includes(122) ||
								codeErrors.includes(123) ||
								codeErrors.includes(111)) &&
							"border-red-500"
						}`}
						onFocus={() => {
							resetError(103);
							resetError(122);
							resetError(123);
							resetError(111);
						}}
						placeholder="Придумайте пароль"
					/>
					{codeErrors.includes(103) && (
						<p className="text-red-500">Заполните поле</p>
					)}
					{codeErrors.includes(122) && (
						<p className="text-red-500">
							Пароль должен содержать не менее 8 символов
						</p>
					)}
					{codeErrors.includes(123) && (
						<p className="text-red-500">
							Пароль не соответствует формату
						</p>
					)}
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
						className={`border-2 rounded-[6px] px-3 py-2 ${
							(codeErrors.includes(104) ||
								codeErrors.includes(111)) &&
							"border-red-500"
						}`}
						onFocus={() => {
							resetError(104);
							resetError(111);
						}}
						placeholder="Введите еще раз"
					/>
					{codeErrors.includes(104) && (
						<p className="text-red-500">Заполните поле</p>
					)}
					{codeErrors.includes(111) && (
						<p className="text-red-500">Пароли не совпадают</p>
					)}
				</div>
				{authError && <p className="text-red-500">{authError}</p>}
				<button
					type="submit"
					className="bg-violet-100 py-2 px-3 rounded-[10px] hover:bg-black hover:text-white duration-75 w-full"
					onClick={(e) => registrationFunc(e)}
				>
					Регистрация
				</button>
				<div className="flex gap-3 justify-between items-center">
					<p>Есть аккаунт? </p>
					<button
						onClick={() => {
							setROL("log");
							setAuthError(null);
							setCodeErrors([]);
						}}
						className="underline"
					>
						Войти
					</button>
				</div>
			</form>
		</>
	);
};

export default Auth;
