import axios from "axios";

export const getUser = async () => {
	try {
		const response = await axios.get("http://localhost:3003/user");
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
