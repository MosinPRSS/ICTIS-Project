import axios from "axios";

export const getThemes = async () => {
	try {
		const response = await axios.get("http://localhost:3002/themes");
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
