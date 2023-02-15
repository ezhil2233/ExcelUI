import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import B2BHome from "./component/B2BHome";
import NotFound from "./component/NotFound";

export default function AppComponent(props) {
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element={<B2BHome />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}
