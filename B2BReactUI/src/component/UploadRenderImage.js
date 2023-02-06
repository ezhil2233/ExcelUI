import React, { Component } from "react"

class UploadRenderImage extends Component {
    handleChange = (event) => {
        this.props.onFileUpload(event);
    }
    render() {
        return (
            <input type="file" onChange={(e) => this.handleChange(e)} />
        );
    }
        
}

export default UploadRenderImage;