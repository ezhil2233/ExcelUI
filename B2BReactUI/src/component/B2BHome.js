import { Button, Collapse, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

import Spinner from "./spinner/Spinner";
import CloseIcon from '@material-ui/icons/Close';
import AddBoxIcon from '@material-ui/icons/AddBox';

import ProductList from "./ProductList";
import UploadRenderImage from "./UploadRenderImage";
import ProductService from "../services/ProductService";
import './B2BHome.css';

export default class B2BHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            file: null,
            successAlert: false,
            loading: false
        }
    }
    openDialog = () => {
        this.setState({
            isDialogOpen: true
        })
    }

    uploadHide = (name) => {
        this.setState({
            loading: true
        })
        if (this.state.file) {
            ProductService.uploadExcel(this.state.file).then(res => {
                this.setState({
                    successAlert: true,
                    loading: false
                })
            }).catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                })
            });
            this.onHide(name);
        }
        this.onHide(name);

    }
    onFileUploadComplete = (fileEvent) => {
        if (fileEvent) {
            this.setState({
                file: fileEvent.target.files[0]
            });
        }
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }
    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <div>
                <Container>
                    <div style={{ marginBottom: '10px' }}>
                        <Collapse in={this.state.successAlert}>
                            <Alert action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setState({ successAlert: false });
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            >Excel Data has been uploaded successfully</Alert>
                        </Collapse>
                    </div>
                    <div className="bulk-import-section">
                        <div>
                            <div className="bulk-plus-icon">
                                <AddBoxIcon />
                            </div>
                            <button className="bulk-btn" onClick={this.openDialog}>Bulk upload</button>
                        </div>
                    </div>
                    <ProductList />
                    <Dialog  disableEscapeKeyDown={true} aria-labelledby="customized-dialog-title" open={this.state.isDialogOpen}>
                    <DialogTitle id="customized-dialog-title">
                        Bulk Upload
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <UploadRenderImage onFileUpload={this.onFileUploadComplete} />
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.onHide('isDialogOpen')} color="primary">
                            Cancel
                        </Button>
                        <Button autoFocus onClick={() => this.uploadHide('isDialogOpen')} variant="contained" color="primary">
                            Upload
                        </Button>

                    </DialogActions>
                </Dialog>
                </Container>
            </div>
        );
    }
}