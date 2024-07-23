import React, {useEffect, useState} from 'react';
import IOtherInfo from "../../models/IOtherInfo";
import OtherInfoApi from "../../api/otherInfoApi";
import {Skeleton} from "antd";
import RenderText from "../RenderTextComponents/RenderText";
import cl from "./style.module.css"
import ICert from "../../models/ICert";
import {ApiUrl} from "../../api";
import {Helmet} from "react-helmet";
import DOMPurify from "dompurify";
import HtmlService from "../../services/HtmlService";

const AboutPageComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = useState<IOtherInfo | undefined>(undefined);
    const [certList, setCertList] = useState<ICert[]>([])
    useEffect(() => {
        OtherInfoApi.getOtherInfoByName("about").then((data) => {
            setData(data);
            setLoading(false);
        }).catch()
        OtherInfoApi.getCerts().then((data) => {
            setCertList(data)
        })
    }, []);

    let content: string = "";
    if (data?.content) {
        const sanitizedHtmlContent = DOMPurify.sanitize(data.content[0].slice(9), {USE_PROFILES: {html: true}});
        content = HtmlService.extractContent(sanitizedHtmlContent, true)
    }
    if (loading) return <><h1>О себе</h1><Skeleton active/></>
    return (
        <div className={cl.cc}>
            <Helmet>
                <title>Все Закупки - О себе</title>
                <meta name="О себе"
                      content={content}/>
            </Helmet>
            <h1>О себе</h1>
            <div className={cl.cont}>
                <RenderText content={data?.content}/>
                <h2>Сертификаты</h2>
                <div className={cl.wr}>
                    {certList.map((item, i) => <a key={item._id} href={`${ApiUrl}/${item.name}`} target={"_blank"} rel="noreferrer">
                            <div>{item.name}

                            </div>
                        </a>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AboutPageComponent;