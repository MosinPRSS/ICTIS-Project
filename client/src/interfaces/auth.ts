export interface IRegisterValidateData {
	nameInput: string;
	emailInput: string;
	passwordInput: string;
	submitPasswordInput: string;
}
export interface ILoginValidateData {
	emailInput: string;
	passwordInput: string;
}

export interface IAuth {
	isAuth: boolean;
}
