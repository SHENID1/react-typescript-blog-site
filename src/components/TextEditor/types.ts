import {EditorState} from "draft-js";

export type TTextEditorTextStyle = | "H1" | "H2" | "OL" | "UL" | "BOLD" | "UNDERLINE" | "HIGHLIGHT";
export type TClsses = {
    textEditor?: string;
}
export type TypeEditorState = typeof EditorState


export interface TProps {
    isInvalid?: boolean;
    classes?: TClsses;
    htmlText?: string | undefined;
    onChangeHTMLText?: (value: string) => void;
    placeholder?: string;
    title?: string;
}