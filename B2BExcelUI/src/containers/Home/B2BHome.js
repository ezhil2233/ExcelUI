import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import UploadRenderImage from "../../component/UploadRenderImage";
import ProductService from "../../services/ProductService";
import ProductList from "../ProductList";
import { Toast } from 'primereact/toast';
import './B2BHome.css'

class B2BHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            file: null
        }
    }

    openDialog = () => {
        this.setState({
            isDialogOpen: true
        })
    }
    renderFooter(name) {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Upload" icon="pi pi-check" onClick={() => this.uploadHide(name)} autoFocus />
            </div>
        );
    }
    uploadHide = (name) => {
        ProductService.uploadExcel(this.state.file).then(res => {
            this.toast.show({severity:'success', summary: 'Bulk Upload', detail:'Data has been uploaded successfully', life: 3000});
        }).catch(error => {
            
        });
        this.onHide(name);
    }
    onFileUploadComplete = (fileEvent) => {
        this.setState( {
            file: fileEvent.target.files[0]
        });
    }
    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }
    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <div className="bulk-import-section">
                    <div>
                        <div className="bulk-plus-icon">
                            <i className="pi pi-plus-circle"></i>
                        </div>
                        <button className="bulk-btn" onClick={this.openDialog}>Bulk upload</button>
                    </div>
                </div>
                <ProductList />
                <Dialog header='Bulk Upload' visible={this.state.isDialogOpen} style={{ width: '50vw' }} footer={this.renderFooter('isDialogOpen')} onHide={() => this.onHide('isDialogOpen')}>
                        <UploadRenderImage onFileUpload={this.onFileUploadComplete}/>
                    </Dialog>
            </div>
        );
    }
}
export default B2BHome; 