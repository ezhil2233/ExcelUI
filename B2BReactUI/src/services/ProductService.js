import * as AppConstant from '../constant/AppConstants';
import React from "react";
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    let [resource, config] = args;

    // request interceptor starts
    let plainCreds = AppConstant.APIUASERNAMEPWD;
    if (resource ) {
        if (resource.includes('/b2badmin/import')) {
            delete config.headers['Content-Type'];
        }
        if (resource.includes('localhost')) {
            plainCreds = AppConstant.APILOCALUASERNAMEPWD;
        }
        
    }
    const basicAuth = btoa(plainCreds);
    
    config.headers['Authorization'] = `Basic ${basicAuth}`;
    


    const response = await originalFetch(resource, config);

    // response interceptor here
    return response;
};


const getProducts = (page, pageSize) => {
    const productUrl = `${AppConstant.APIENDPOINT}/o/headless-commerce-admin-catalog/v1.0/products?pageSize=${pageSize}&page=${page}`;
    const requestData = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    };
    return fetch(productUrl, requestData);
}

const getPriceData = (priceId) => {
    const priceUrl = `${AppConstant.APIENDPOINT}/o/headless-commerce-admin-catalog/v1.0/products/${priceId}/skus`;
    const requestData = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    };
    return fetch(priceUrl, requestData);
}

const uploadExcel = (file) => {
    const formData = new FormData();
    formData.append("groupId", Liferay.ThemeDisplay.getSiteGroupId())
    formData.append(
        "productFile",
        file,
        file.name
    );
    const url = `${AppConstant.APILOCALENDPOINT}/o/b2badmin/import`;
    const requestData = {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    };
    return fetch(url, requestData);
}

const ProductService = { getProducts, getPriceData, uploadExcel };

export default ProductService;
