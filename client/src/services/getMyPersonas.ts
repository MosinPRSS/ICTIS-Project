import axios from "axios";

async function getMyPersonas() {
	try {
		const response = await axios.get("http://localhost:3003/myPersonas");

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default getMyPersonas;
