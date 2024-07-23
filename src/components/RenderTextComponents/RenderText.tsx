import React, {FC} from 'react';
import DOMPurify from "dompurify";
import ImageViewer from "./ImageViewer";

interface RenderTextComponents {
    content?: string[];
}

const RenderText: FC<RenderTextComponents> = ({content}) => {
    if (!content) return null;
    return (
        <>
            {content?.map((item, index) => {
                const contentSplit = item.split(" ");
                const sanitizedHtmlContent = DOMPurify.sanitize(item.slice(9), {USE_PROFILES: {html: true}});
                if (contentSplit[0] === "htmlText") return <div key={index + contentSplit[1]}
                                                                dangerouslySetInnerHTML={{__html: sanitizedHtmlContent}}></div>;
                return <ImageViewer name={contentSplit[1]} key={index + contentSplit[1]}/>;
            })}
        </>
    );
};

export default RenderText;