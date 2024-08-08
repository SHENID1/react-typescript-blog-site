import React, {useEffect, useState} from 'react';
import cl from "./style.module.css"
import IOtherInfo from "../../models/IOtherInfo";
import OtherInfoApi from "../../api/otherInfoApi";
import {Skeleton} from "antd";
import RenderText from "../RenderTextComponents/RenderText";
import {Helmet} from "react-helmet";
import DOMPurify from "dompurify";
import HtmlService from "../../services/HtmlService";

const PrivacyPolicyPage = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = useState<IOtherInfo | undefined>(undefined);
    useEffect(() => {
        window.scrollTo(0, 0);
        OtherInfoApi.getOtherInfoByName("privacy").then((data) => {
            setData(data);
            setLoading(false);
        }).catch()
    }, []);

    let content: string = "";
    if (data?.content) {
        const sanitizedHtmlContent = DOMPurify.sanitize(data.content[0].slice(9), {USE_PROFILES: {html: true}});
        content = HtmlService.extractContent(sanitizedHtmlContent, true)
    }
    if (loading) return <><h1>Политика конфиденциальности</h1><Skeleton active/></>
    return (
        <div className={cl.cc}>
            <Helmet>
                <title>Политика конфиденциальности</title>
                <meta name="description"
                      content={content}/>
            </Helmet>
            <div className={cl.cont}>
                <RenderText content={data?.content} />
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;