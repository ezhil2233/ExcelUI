import React, { Component } from "react"

class UploadRenderImage extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        this.props.onFileUpload(event);
    }
    render() {
        return (
            <>
            <input type="file" onChange={(e) => this.handleChange(e)} />
           {/*  <img src={file} /> */}
            </>
        );
    }
        
}

export default UploadRenderImage;