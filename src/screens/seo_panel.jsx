import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { supabase } from "../utils/supabase";
import { useToast } from "../providers/toast";
import { ProgressSpinner } from "primereact/progressspinner";

function SeoPanel() {
    const [seoRows, setSeoRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const toastRef = useToast();

    const show = (message, status) => {
        toastRef.current.show({ severity: status, summary: 'Info', detail: message });
    };

    useEffect(() => {
        async function fetchSeoData() {
            const { data, error } = await supabase
                .from("seo_data")
                .select("*");

            if (error) {
                console.error("Error fetching SEO data:", error);
                show("Error fetching data", "error");
            } else {
                setSeoRows(data);
            }
            setLoading(false);
        }

        fetchSeoData();
    }, []);

    const handleChange = (index, field, value) => {
        setSeoRows((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = async (row) => {
        const { error } = await supabase
            .from("seo_data")
            .update({
                title: row.title,
                description: row.description,
            })
            .eq("for_route", row.for_route);

        if (error) {
            console.error("Error updating SEO data:", error);
            show("Failed to update", "error");
        } else {
            show(`Updated "${row.for_route}"`, "success");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <div className="App p-4 max-w-[960px] mx-auto space-y-6">
            {seoRows.map((row, index) => (
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
                    key={row.for_route}
                    title={<div>Route: <a target={'_blank'} href={`https://tripofert.com${row.for_route}`}>{`tripofert.com${row.for_route}`}</a></div>}
                    subTitle="Edit SEO entry"
                >
                    <label htmlFor={`title-${index}`}>Title</label>
                    <InputText
                        id={`title-${index}`}
                        name="title"
                        style={{ width: "100%" }}
                        value={row.title}
                        onChange={(e) => handleChange(index, "title", e.target.value)}
                    />
                    <small style={{margin: '3px 0 10px', display: 'block'}} id="title-help">
                        Edit title for this route.
                    </small>

                    <label htmlFor={`desc-${index}`} style={{margin: '10px 0 3px', display: 'block'}}>
                        Description
                    </label>
                    <InputTextarea
                        id={`desc-${index}`}
                        name="description"
                        rows={5}
                        style={{ width: "100%" }}
                        value={row.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        autoResize
                    />
                    <small style={{margin: '3px 0 10px', display: 'block'}}>Edit description for this route.</small>

                    <Button
                        style={{display: 'block', margin: '20px auto 0'}}
                        className="mt-4"
                        label="Save"
                        onClick={() => handleSubmit(row)}
                    />
                </Card>
            ))}
        </div>
    );
}

export default SeoPanel;
