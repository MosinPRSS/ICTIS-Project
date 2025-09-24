import {
	IRegisterValidateData,
	ILoginValidateData,
} from "@/interfaces/interfaces";

/*
    Коды для понимания:

    0 - все в порядке
    1 - не все в порядке

    10X - есть незаполненное поле

    101 - поле name не заполнено
    102 - поле email не заполнено
    103 - поле password не заполнено
    104 - поле submitPassword не заполнено

    11X - ну тут 1 код только, но оно не совсем понятно

    111 - пароли не совпадают

    12X - данные не соответствуют формату

    121 - email не соответствует формату
    122 - пароль короткий
    123 - пароль не соответствует формату
*/

export const useValidate = () => {
	const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

	const registrationValidation = ({
		nameInput,
		emailInput,
		passwordInput,
		submitPasswordInput,
	}: IRegisterValidateData) => {
		let isValidate = true;
		const codeError = [0];

		const name = nameInput.trim();
		const email = emailInput.trim();
		const password = passwordInput.trim();
		const submitPassword = submitPasswordInput.trim();

		if (!name) {
			isValidate = false;
			codeError.push(101);
		}

		if (!email) {
			isValidate = false;
			codeError.push(102);
		}

		if (!password) {
			isValidate = false;
			codeError.push(103);
		}

		if (!submitPassword) {
			isValidate = false;
			codeError.push(104);
		}

		if (password && submitPassword && password !== submitPassword) {
			isValidate = false;
			codeError.push(111);
		}

		if (!codeError.includes(102) && !EMAIL_REGEXP.test(email)) {
			isValidate = false;
			codeError.push(121);
		}

		if (!codeError.includes(103) && password.length < 8) {
			isValidate = false;
			codeError.push(122);
		}

		if (!codeError.includes(103) && !PASSWORD_REGEXP.test(password)) {
			isValidate = false;
			codeError.push(123);
		}

		if (!isValidate) {
			codeError.shift();
		}

		return {
			isValidate,
			codeError,
		};
	};

	const loginValidation = ({
		emailInput,
		passwordInput,
	}: ILoginValidateData) => {
		let isValidate = true;
		const codeError = [0];

		const email = emailInput.trim();
		const password = passwordInput.trim();

		if (!email) {
			isValidate = false;
			codeError.push(102);
		}

		if (!password) {
			isValidate = false;
			codeError.push(103);
		}

		if (!isValidate) {
			codeError.shift();
		}

		return {
			isValidate,
			codeError,
		};
	};
	return {
		registrationValidation,
		loginValidation,
	};
};
