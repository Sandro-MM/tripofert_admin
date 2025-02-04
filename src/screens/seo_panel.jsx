import {Card} from "primereact/card";
import React, {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";

function SeoPanel() {
    const [title, SetTitle] = useState()
    const [description, SetDescription] = useState()

    return (
        <Card style={{
            marginTop:'24px',
            maxWidth: '800px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center'
        }} title="Tripofert Seo Dashboard">
            <div style={{width: '100%'}}>
                <div style={{margin: '10px 0 3px'}}>Title</div>
                <InputTextarea
                    style={{width: '100%'}}
                    autoResize value={title}
                    onChange={(e) => SetTitle(e.target.value)}
                    rows={2}/>
                <div style={{margin: '10px 0 3px'}}>Description</div>
                <InputTextarea
                    style={{width: '100%'}}
                    autoResize
                    value={description}
                    onChange={(e) => SetDescription(e.target.value)}
                    rows={5}
                />
            </div>
            <Button style={{marginTop:'20px'}}>Save</Button>
        </Card>
    );
}

export default SeoPanel;
