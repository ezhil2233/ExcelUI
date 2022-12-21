import React from "react";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import UploadRenderImage from "../component/UploadRenderImage";

class AddProduct extends React.Component {
    constructor() {
        super();
    }
    state = {name:'', price:null, file: null};
    onUpload() {
        this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    customBase64Uploader = async (event) => {
        const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        const base64data = reader.result;
        console.log(base64data);
    }
    }
    handleChange = (event) => {
        this.setState({file: event.target.files[0]});
    }
    prepareState = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }
    submitData(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        
        return (
            <div>
                <Toast ref={(el) => { this.toast = el; }}></Toast>
                <div className="card">
                    <FileUpload name="demo[]" url='null' onUpload={this.onUpload} customUpload uploadHandler={this.customBase64Uploader} accept=".xlsx" maxFileSize={10000000}
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                </div>
                <div>
                    <form onSubmit={(event) => this.submitData(event)}>
                    <span className="p-float-label">
                        <InputText name='name' type="text" className="block mb-2" onChange={this.prepareState}/>
                        <label htmlFor="name">PRODUCT NAME</label>
                    </span>
                    <span className="p-float-label">
                        <InputText name='price' type="text" className="block mb-2" onChange={this.prepareState}/>
                        <label htmlFor="price">PRODUCT PRICE</label>
                    </span>
                    <UploadRenderImage />
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            
            
        )
    }
 }
 export default AddProduct;