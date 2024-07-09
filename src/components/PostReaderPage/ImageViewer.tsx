import React from 'react';
import cl from "./style.module.css"
import {ApiUrl} from "../../api";
interface Props {
    name: string;
}
const ImageViewer: React.FC<Props> = ({name}) => {
    return (
        <div className={cl.imageCont}>
            <img src={`${ApiUrl}/${name}`} alt="" className={cl.image}/>
        </div>
    );
};

export default ImageViewer;