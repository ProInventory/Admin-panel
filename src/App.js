import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Users from "./components/users";
import Branches from "./components/branches";
import NotFound from "./components/404";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/users" element={<Users />} />
			<Route path="/branches" element={<Branches />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
