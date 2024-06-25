import React, {FC, memo, useCallback, useState} from 'react';
import clsx from "clsx";
import Draft, {Editor, RichUtils, EditorState} from "draft-js";
import {convertFromHTML, converToHTML} from "draft-convert";
import cl from "./style.module.css"
import {TEXT_EDITOR_STYLE_TO_HTML} from "./constans";
import {TProps, TTextEditorTextStyle, TypeEditorState} from "./types";


const TextEditor: FC<TProps> = ({
     isInvalid = false,
     classes,
     htmlText,
     onChangeHTMLText,
     placeholder,
     title
}) => {

    const [isFocused, setFocused] = useState<boolean>(false);
    const [editorState, setEditorState] = useState<TypeEditorState>(EditorState.createEmpty());
    let wrapperClassName = "Text-Editor-Wrapper";
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType("") !== "unstyled") {
            wrapperClassName += " rm-placeholder";
        }
    }

    const onChangeBlur = () => {
        setFocused(false);
    }
    const handleChangeFocus = () => {
        setFocused(true);
    }
    const options = {
        styleToHTML: (style: string) => TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle)
    }
    const convertMessageToHTML = convertFromHTML(options);
    const handleChangeText = useCallback((value: TypeEditorState) => {
        const currentSelection = value.getSelection();
        onChangeHTMLText?.(convertMessageToHTML(value.getCurrentContent()))
        const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection)
        setEditorState(stateWithContentAndSelection)
    }, [])
    const handleKeyCommand = useCallback(
        (command: any, editorState: TypeEditorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return "handled";
            }
            return "not-handled";
    }, [editorState, setEditorState])

    return (
        <div className={clsx(classes?.textEditor)}>
            <div className={cl.title}>
                {title}
            </div>
            <div className={clsx(cl.Area, {
                "Focused": isFocused || contentState.hasText(),
                "isInvalid": isInvalid
            })}
                 onClick={handleChangeFocus}
            >
                <div className={cl.wrapper}>
                    <EditorState onBlur={handleChangeFocus}
                                 placeholder={placeholder}
                                 editorState={editorState}
                                 onChange={handleChangeText}

                    />
                </div>
            </div>
        </div>
    );
};

export default memo(TextEditor);