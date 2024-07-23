import React, {useEffect, useState} from 'react';
import {Skeleton} from "antd";
import OtherInfoApi from "../../api/otherInfoApi";
import IOtherInfo from "../../models/IOtherInfo";
import RenderText from "../RenderTextComponents/RenderText";
import cl from "./style.module.css"
import {Helmet} from "react-helmet";
import DOMPurify from "dompurify";
import HtmlService from "../../services/HtmlService";

const ContactsPageComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = useState<IOtherInfo | undefined>(undefined);
    useEffect(() => {
        OtherInfoApi.getOtherInfoByName("contacts").then((data) => {
            setData(data);
            setLoading(false);
        }).catch()
    }, []);
    let content: string = "";
    if (data?.content) {
        const sanitizedHtmlContent = DOMPurify.sanitize(data.content[0].slice(9), {USE_PROFILES: {html: true}});
        content = HtmlService.extractContent(sanitizedHtmlContent, true)
    }
    if (loading) return <><h1>Контакты</h1><Skeleton active/></>

    return (
        <div className={cl.cc}>
            <Helmet>
                <title>Все Закупки - Контакты</title>
                <meta name="Контакты"
                      content={content}/>
            </Helmet>
            <h1>Контакты</h1>
            <div className={cl.cont}>
                <RenderText content={data?.content}/>
            </div>

        </div>
    );
};

export default ContactsPageComponent;