import React from 'react';
import {IconType} from "../TextEditor";


interface IconButtonProps {
    isActive?: boolean;
    typeIcon?: IconType;
}
const IconButton: React.FC<IconButtonProps> = ({isActive, typeIcon}) => {

    return (
        <div>
            {typeIcon}
        </div>
    );
};
export default IconButton;