import axios from "axios";

async function getBotsDashboard() {
	try {
		const response = await axios.get("http://localhost:3002/botsList");

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default getBotsDashboard;
