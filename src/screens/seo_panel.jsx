import React, {useEffect, useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {supabase} from "../utils/supabase";
import {useToast} from "../providers/toast";
import {ProgressSpinner} from "primereact/progressspinner";


function SeoPanel() {
    const [seoData, setSeoData] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const toastRef = useToast();

    const show = (messege, status) => {
        toastRef.current.show({ severity: status, summary: 'Info', detail: messege });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeoData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('seo_data')
            .update({
                title: seoData.title,
                description: seoData.description,
            })
            .eq('id', 1);

        if (error) {
            console.error('Error updating SEO data:', error);
            show('Failed to update','error')
        } else {
            show('SEO data updated!','success')
        }
    };


    useEffect(() => {
        async function fetchSeoData() {
            let { data, error } = await supabase
                .from('seo_data')
                .select('*')
                .eq('id', 1)
                .single();

            if (error) {
                console.error('Error fetching SEO data:', error);
            } else {
                setSeoData(data);
            }
            setLoading(false);
        }

        fetchSeoData();
    }, []);

    return (
        <div className="App">
            <Card
                pt={{body:{style:{width:'100%'}}}}
                style={{
                maxWidth: '800px',
                margin: '50px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center'
            }}
                title="Tripofert Seo Panel"
                subTitle={'Edit Seo data'}>

                <label style={{margin: '10px 0 3px', display: 'block'}} htmlFor="title">Title</label>

                <InputText
                    style={{width:'100%'}}
                    aria-describedby="title-help"
                    id="title"
                    type="text"
                    name="title"
                    value={seoData.title}
                    onChange={handleChange}
                    tabIndex={1}/>

                <small style={{margin: '3px 0 10px', display: 'block'}} id="title-help">
                    Edit Title.
                </small>

                <label style={{margin: '10px 0 3px', display: 'block'}} htmlFor="title">Description</label>

                <InputTextarea
                    autoResize rows={8}
                    style={{width:'100%', maxWidth: '760px'}}
                    id="description"
                    aria-describedby="description-help"
                    name="description"
                    value={seoData.description}
                    onChange={handleChange}
                    tabIndex={2}/>

                <small style={{margin: '3px 0 10px', display: 'block'}} id="title-help">
                    Edit Description.
                </small>

                {loading ? (
                    <Button>
                        <ProgressSpinner />
                    </Button>
                ) : (
                <Button type="submit" tabIndex={3} style={{display: 'block', margin: '20px auto 0'}}>Save</Button>
                )}
            </Card>
        </div>
    );
}

export default SeoPanel;
