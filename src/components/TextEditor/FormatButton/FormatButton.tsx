import type {FC} from "react";
import IconButton from "../../iconButton/iconButton"
import "./FormatButton.css";
import {IconType} from "../types";

type TProps = {
    isActive?: boolean;
    onToggle: (style: string) => void;
    size?: string;
    style: string;
    typeIcon: IconType | string;
};

export const FormatButton: FC<TProps> = ({isActive, onToggle, style, typeIcon}) => {
    return (
        <div
            className="FormatButton"
            onMouseDown={(event) => {
                event.preventDefault();
                onToggle?.(style);
            }}
        >

            <IconButton isActive={isActive} typeIcon={typeIcon as IconType}/>
        </div>
    );
};
