import React from "react";
import { Route, Routes } from "react-router-dom";
import B2BHome from "./component/B2BHome";
import NotFound from "./component/NotFound";


function AppRouter(props) {
    return (
        <Routes>
            <Route path='/' element= {<B2BHome />} />
            <Route path="/notfound" element= {<NotFound />} />
        </Routes>
    )
}

export default AppRouter;
