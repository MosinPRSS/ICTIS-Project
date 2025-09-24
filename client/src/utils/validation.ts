import {
	IRegisterValidateData,
	ILoginValidateData,
} from "@/interfaces/interfaces";

export function registrationValidation({
	name,
	email,
	password,
	submitPassword,
}: IRegisterValidateData) {
	let isValidate = true;
	return isValidate;
}

export function loginValidation({ email, password }: ILoginValidateData) {
	let isValidate = true;
	return isValidate;
}
