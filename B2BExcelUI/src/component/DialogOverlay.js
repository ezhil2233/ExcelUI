import Dialog from 'primereact/dialog';
import { Button } from 'primereact/button';
import React from 'react';

function DialogOverlay(props) {
    const [displayDialog, setDisplayDialog] = React.useState();
    onClick = (name) => {
        setDisplayDialog(true)
    }   
    return (
        <div className="dialog-demo">
            <div className="card">
                <Dialog header="Header" visible={this.state.displayDialog} style={{ width: '50vw' }} footer={this.renderFooter('displayDialog')} onHide={() => this.onHide('displayDialog')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Dialog>
            </div>
        </div>
    );
}

export default DialogOverlay;