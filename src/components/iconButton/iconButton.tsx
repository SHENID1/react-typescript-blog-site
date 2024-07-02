import React from 'react';
import {IconType} from "../TextEditor";
import cl from './style.module.css';

interface IconButtonProps {
    isActive?: boolean;
    typeIcon?: IconType;
}
const IconButton: React.FC<IconButtonProps> = ({isActive, typeIcon}) => {

    return (
        <div className={cl.button}>
            {typeIcon}
        </div>
    );
};
export default IconButton;