import axios from "axios";

async function getMyBots() {
	try {
		const response = await axios.get("http://localhost:3003/myBots");

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default getMyBots;
