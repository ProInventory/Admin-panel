import axios from "axios";

import Config from "../../config.json";

async function fetchData(url, method = "get") {
	url = Config.api + url;

	try {
		if (method === "get") {
			const response = await axios.get(url);
			return response.data;
		} else if (method === "post") {
			const response = await axios.post(url);
			return response.data;
		} else if (method === "put") {
			const response = await axios.put(url);
			return response.data;
		} else if (method === "delete") {
			const response = await axios.delete(url);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
}

export default fetchData;
