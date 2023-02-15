import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import ProductService from "../services/ProductService";
import Spinner from "./spinner/Spinner";
import * as AppConstant from '../constant/AppConstants';

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { productList: [], priceData: [], loading: false, page: 0, rowsPerPage: 10, totalCounts:0 };

    }

    componentDidMount() {
        this.getData(this.state.page + 1, this.state.rowsPerPage);
    }

    getData(page, rowsPerPage) {
        this.setState({
            loading: true 
        });

        ProductService.getProducts(page, rowsPerPage)
                            .then((response) => response.json())
                            .then((data) => {
                                this.setState({
                                    productList: data.items,
                                    totalCounts: data.totalCount,
                                    priceData: []
                                });
                                this.getPriceData();
                            }).catch(err => {
                                console.log(err);
                                this.setState({
                                    loading: false
                                })
                            })
        
        /* ProductService.getProducts(page, rowsPerPage).then(res => {
            console.log(res);
            this.setState({
                productList: res.data.items,
                totalCounts: res.data.totalCount,
                priceData: []
            });
            this.getPriceData();
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false
            })
        }) */
    }

    getPriceData() {
        let tempPriceDatas = [];
        this.state.productList.map(product => {
            ProductService.getPriceData(product.productId)
                            .then((response) => response.json())
                            .then((priceRes) => {
                                tempPriceDatas = [...tempPriceDatas];
                                tempPriceDatas.push({
                                    productId: product.productId,
                                    price: priceRes.data.items[0].price,
                                    promoPrice: priceRes.data.items[0].promoPrice,
                                    weight: priceRes.data.items[0].weight
                                });
                                this.setState({
                                    priceData: tempPriceDatas,
                                    loading: tempPriceDatas.length !== this.state.productList.length
                                });
                            }).catch(err => {
                                console.log(err);
                                this.setState({
                                    loading: false
                                })
                            })
            
            
            
            /* .then(priceRes => {
                tempPriceDatas = [...tempPriceDatas];
                tempPriceDatas.push({
                    productId: product.productId,
                    price: priceRes.data.items[0].price,
                    promoPrice: priceRes.data.items[0].promoPrice,
                    weight: priceRes.data.items[0].weight
                });
                this.setState({
                    priceData: tempPriceDatas,
                    loading: tempPriceDatas.length !== this.state.productList.length
                });
            }).catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                })
            }) */
        })
    }

    getConditionlClassName = (status) => {
        if (status === 'published') {
            return 'App-link';
        }
        return 'status-draft';
    }

    render() {
        const apiBaseUrl = AppConstant.APIENDPOINT;
        const handleChangePage = (event, newPage) => {
            this.setState({
                page: newPage
            });
            this.getData(newPage + 1, this.state.rowsPerPage);
        };
        const handleChangeRowsPerPage = (event) => {
            this.setState({
                page: 0,
                rowsPerPage: parseInt(event.target.value, 10)
            });
            this.getData(1, parseInt(event.target.value, 10));

        };
        const dynamicRows = this.state.productList.map(rowData => {
            const priceData = this.state.priceData.find(price => price.productId === rowData.productId);
            const formatCurrency = (value) => {
                return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
            const formatDate = (value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-GB', {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                });
            }
            return <TableRow key={rowData.id}>
                <TableCell>{
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <img src={apiBaseUrl + rowData.thumbnail} onError={(e) => e.target.src = '/logo192.png'}
                                alt={rowData.thumbnail} className="product-image" />
                        </div>
                        <div className="item-content">
                            <div className={this.getConditionlClassName('published') + ' item-status'} >PUBLISHED</div>
                            <div>{rowData.name.en_US}</div>
                            <span>{rowData.shortDescription ? rowData.shortDescription.en_US : 'Demo Description'}</span>
                        </div>
                    </div>
                }</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>Price:</div>
                            <div>{formatCurrency(priceData ? priceData.price : 100)}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Promo Price:</div>
                            <div>{formatCurrency(priceData ? priceData.promoPrice : 90)}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Discount:</div>
                            <div>{priceData ? priceData.weight : 10}%</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Quantity:</div> <div>100000</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>M.S Quantity:</div> <div>1000</div>
                        </div>
                    </div>
                }
                </TableCell>
                <TableCell>{formatDate(rowData.createDate)}</TableCell>
                <TableCell>{formatDate(rowData.modifiedDate)}</TableCell>
            </TableRow>;
        });
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <div className="product-list">
                <Paper>
                    <TableContainer>
                        My Items
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{"ITEM"}</TableCell>
                                    <TableCell>{"LOCATION"}</TableCell>
                                    <TableCell>{"PRICE/QUANTITY"}</TableCell>
                                    <TableCell>{"CREATED"}</TableCell>
                                    <TableCell>{"UPDATED"}</TableCell>
                                    {/* <TableCell>{"STATISTICS"}</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>{ dynamicRows }</TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        page={this.state.page}
                        rowsPerPage={this.state.rowsPerPage}
                        count={this.state.totalCounts}
                        rowsPerPageOptions={[10,20,30]}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}>
                    </TablePagination>
                </Paper>
            </div>
        )
    }
}
export default ProductList;
