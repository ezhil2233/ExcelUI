import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProductService from "../services/ProductService";
import { Button } from "primereact/button";
import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';

import Spinner from "../component/spinner/Spinner";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { productList: [], priceData:  [], loading: true };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        ProductService.getProducts().then(res => {
            console.log(res);
            this.setState({
                productList: res.data.items,
                priceData: []
            });
            this.getPriceData();
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false
            })
        })
    }

    getPriceData() {
        let tempPriceDatas = [];
        this.state.productList.map(product => {
            ProductService.getPriceData(product.productId).then(priceRes => {
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
        })        
    }

    getConditionlClassName = (status) => {
        if (status === 'published') {
            return 'App-link';
        }
        return 'status-draft';
    }

    render() {
        const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;
        const header = (
            <div className="table-header">
                My Items
                {/* <Button icon='pi pi-refresh'/> */}
            </div>
        );
        const footer = `In total there are ${this.state.productList ? this.state.productList.length : 0} products.`;

        const imageBodyTemplate = (rowData) => {
            return <>
                <div>

                    <img src={rowData.thumbnail} onError={(e) => e.target.src = '/logo192.png'}
                        alt='i' className="product-image" />;
                </div>
            </>
        }
        const itemBodyTemplate = (rowData) => {
            return <div className="d-flex">
                <div className="d-flex align-items-center">
                    <img src={apiBaseUrl + rowData.thumbnail} onError={(e) => e.target.src = '/logo192.png'}
                        alt={rowData.thumbnail} className="product-image" />
                </div>
                <div className="item-content">
                    <div className={this.getConditionlClassName('published') + ' item-status'} >PUBLISHED</div>
                    <div> <i className="pi pi-info-circle" style={{ color: 'blue' }}></i> {rowData.name.en_us}</div>
                    <Rating value={rowData.rating ? rowData.rating : 2} readOnly cancel={false} />
                    <span>{rowData.shortDescription ? rowData.shortDescription.en_US : 'Demo Description'}</span>
                </div>
            </div>
        }
        const descriptionBodyTemplate = (rowData) => {
            return <div >
                <div className="d-flex justify-content-between">
                    <div>Price:</div>
                    <div>0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Final Price:</div>
                    <div>0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Discount:</div>
                    <div>0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Quantity:</div> <div>0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>M.S Quantity:</div> <div>0</div>
                </div>

            </div>
        }
        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }

        const formatDate  = (value) => {
            const date  = new Date(value);
            return date.toLocaleDateString('en-GB', {
                day: "numeric",
                month:"short" ,
                year:"numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        }

        const createDateBodyTemplate = (rowData) => {
            return <>
                {formatDate(rowData.createDate)}
            </>
        }
        const updateDateBodyTemplate = (rowData) => {
            return <>
                {formatDate(rowData.modifiedDate)}
            </>
        }

        const priceAndQuantityBodyTemplate = (rowData) => {
            const priceData = this.state.priceData.find(price => price.productId === rowData.productId);
            return <div >
                <div className="d-flex justify-content-between">
                    <div>Price:</div>
                    <div>{formatCurrency(priceData.price)}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Promo Price:</div>
                    <div>{formatCurrency(priceData.promoPrice)}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Discount:</div>
                    <div>{priceData.weight}%</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Quantity:</div> <div>100000</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>M.S Quantity:</div> <div>1000</div>
                </div>

            </div>
        }
        const columns = [
            { field: "thumbnail", header: 'ITEM', body: itemBodyTemplate },
            { field: "location", header: 'LOCATION' },
            { field: "price", header: 'PRICE/QUANTITY', body:priceAndQuantityBodyTemplate },
            { field: "createDate", header: 'CREATED', sortable: 'sortable', body: createDateBodyTemplate },
            { field: "modifiedDate", header: 'UPDATED', sortable: 'sortable', body: updateDateBodyTemplate },
            { field: "shortDescription", header: 'STATISTICS', body: descriptionBodyTemplate },
        ];
        const dynamicColumns = columns.map(column => {
            return <Column key={column.field} field={column.field} header={column.header} body={column.body} sortable={column.sortable} />;
        });

        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
        const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
            if (this.state.loading) {
                return <Spinner />
            }
        return (
            <div className="product-list">
                <div className="card">
                    
                    <DataTable value={this.state.productList} header={header} showGridlines stripedRows
                        paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 15]}
                        paginatorPosition='top' paginatorClassName='p-paginatorleft'
                        responsiveLayout='stack'>
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
        )
    }
}
export default ProductList;