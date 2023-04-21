import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import NotFound from "./components/404";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
