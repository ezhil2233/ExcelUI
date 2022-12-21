import axios, * as others from '../auth/axios'

const getProducts = () => {
    const productUrl = `${process.env.REACT_APP_API_ENDPOINT}o/headless-commerce-admin-catalog/v1.0/products`;
    return axios.get(productUrl);
}

const getPriceData = (priceId) => {
    const priceUrl = `${process.env.REACT_APP_API_ENDPOINT}o/headless-commerce-admin-catalog/v1.0/products/${priceId}/skus`;
    return axios.get(priceUrl)
}

const uploadExcel = (file) => {
    const formData = new FormData();
    formData.append(
        "productFile",
        file,
        file.name
      );
    const url = `${process.env.REACT_APP_API_LOCAL_END_POINT}api/b2b/uploadProduct`;
    return axios.post(url, formData);
}

const getPrice = (id) => {
    const url = 
    axios.get(url);
}


const ProductService = {getProducts, getPriceData, uploadExcel};

export default ProductService;