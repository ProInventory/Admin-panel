import axios from "axios";

import Config from "../../config.json";

async function fetchData(url, method = "GET", data = null) {
	url = Config.api + url;
	let response = null;

	try {
		if (method === "GET") {
			response = await axios.get(url);
		} else if (method === "POST") {
			response = await axios.post(url, data);
		} else if (method === "PUT") {
			response = await axios.put(url);
		} else if (method === "DELETE") {
			response = await axios.delete(url);
		}

		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
}

export default fetchData;
