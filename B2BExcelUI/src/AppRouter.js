import { Route, Routes } from "react-router-dom";
import AddProduct from "./containers/AddProduct";
import B2BHome from "./containers/Home/B2BHome";
import NotFound from "./containers/NotFound";
import ProductList from "./containers/ProductList";

function AppRouter(props) {
    return (
        <Routes>
            <Route path='/' element= {<B2BHome />} />
            <Route path="/products" element= {<ProductList />} />
            <Route path="/addproduct" element= {<AddProduct />} />
            <Route path="*" element= {<NotFound />} />
        </Routes>
    )
}

export default AppRouter;