import clsx from "clsx";
import {Editor, EditorState, RichUtils} from "draft-js";
import {convertToHTML, convertFromHTML} from "draft-convert";
import {memo, useCallback, useEffect, useRef, useState} from "react";
import type {FC} from "react";

import {BlockStyleControls} from "./BlockStyleControls";
import {TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML} from "./constants";
import {InlineStyleControls} from "./InlineStyleControls";
import type {TTextEditorTextStyle} from "./types";

import "draft-js/dist/Draft.css";
import "./TextEditor.css";
import {Affix} from "antd";

type TClasses = {
    textEditor?: string;
};

type TProps = {
    classes?: TClasses;
    htmlText?: string;
    isInvalid?: boolean;
    onChangeHTMLText?: (value: string) => void;
    getValue?: () => string;
    placeholder?: string;
    title?: string;
};

const TextEditorComponent: FC<TProps> = ({
                                             classes,
                                             htmlText,
                                             isInvalid = false,
                                             onChangeHTMLText,
                                             placeholder,
                                             title,
                                             getValue
                                         }) => {
    const [focused, setFocused] = useState(false);
    const [editorState, setEditorState] = useState<typeof EditorState>(EditorState.createEmpty());
    let wrapperClassName = "TextEditor-Wrapper";
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType("") !== "unstyled") {
            wrapperClassName += " TextEditor-Wrapper__hidePlaceholder";
        }
    }


    const options = {
        styleToHTML: (style: string) => TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
    };
    const convertMessageToHtml = convertToHTML(options);
    const TextEditorRef = useRef<any>()
    const convertHtmlToRaw = (html: string): typeof EditorState => {
        const contentState = convertFromHTML({
            htmlToStyle: (nodeName: string, node: any, currentStyle: any) => {
                if (nodeName === "span" && node.className === "highlight") {
                    return currentStyle.add("HIGHLIGHT");
                } else {
                    return currentStyle;
                }
            },
        })(html);
        return EditorState.createWithContent(contentState);
    };

    useEffect(() => {
        htmlText && setEditorState(convertHtmlToRaw(htmlText));
    }, [htmlText]);

    const handleChangeBlur = () => {
        // console.log("handleChangeBlur")
        console.log(TextEditorRef.current)
        TextEditorRef.current.blur()
        // TextEditorRef.current.focusout()

        // document.TextEditorRef.blur()


        setFocused(false);
    };

    const handleChangeFocus = () => {
        setFocused(true);
    };

    const handleChangeText = useCallback((value: typeof EditorState) => {
        const currentSelection = value.getSelection();
        onChangeHTMLText?.(convertMessageToHtml(value.getCurrentContent()));
        const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection);
        setEditorState(stateWithContentAndSelection);
        // eslint-disable-next-line
    }, []);

    const handleKeyCommand = useCallback(
        (command: any, editorState: typeof EditorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return "handled";
            }
            return "not-handled";
        },// eslint-disable-next-line
        [editorState, setEditorState],
    );

    const getBlockStyle = (block: any) => {
        switch (block.getType("")) {
            case "blockquote":
                return "RichEditor-blockquote";
            default:
                return null;
        }
    };
    getValue?.call(() => {
        return editorState.getCurrentContent()
    })
    return (
        <div className={clsx("TextEditor", classes?.textEditor)}>
            {/*<div className="TextEditor-Title">{title}</div>*/}
            <div
                className={clsx("TextEditor-Area", {
                    "TextEditor-Area__isInvalid": isInvalid,
                    "TextEditor-ea__isFocused": focused,
                })}
                onClick={handleChangeFocus}
            >
                <Affix offsetTop={10}>
                    <div className="TextEditor-Sub">
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={(blockType) => {
                                const newState = RichUtils.toggleBlockType(editorState, blockType);
                                setEditorState(newState);
                            }}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={(inlineStyle) => {
                                const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
                                setEditorState(newState);
                            }}
                        />
                    </div>
                </Affix>
                <div className={wrapperClassName}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        onBlur={handleChangeBlur}
                        onChange={handleChangeText}
                        placeholder={placeholder}
                        ref={TextEditorRef}
                        preserveSelectionOnBlur={true}
                        tabindex={0}
                    />
                </div>

            </div>
        </div>
    );
};

export const TextEditor = memo(TextEditorComponent);
