import axios from "axios";

async function getBotsDashboard() {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/b/list");

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default getBotsDashboard;
