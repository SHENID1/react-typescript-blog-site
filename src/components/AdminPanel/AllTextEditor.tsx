import {convertToRaw, EditorState} from "draft-js";
import {FC, memo, useState} from "react";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML, ContentState } from 'draft-js'

// import {Fragment} from "react";
// import {convertFromHTML} from "draft-convert";


type TProps = {
    defaultValue?: string;
    isInvalid?: boolean;
    onChangeHTMLText?: (value: string) => void;
    getValue?: () => string;
    placeholder?: string;
    title?: string;
};
const AllTextEditor: FC<TProps> = ({onChangeHTMLText, defaultValue}) => {

    const blocksFromHTML = convertFromHTML(defaultValue);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      // console.log(1, EditorState.createWithContent(content), defaultValue)


    const [editorState, setEditorState] = useState(defaultValue ? EditorState.createWithContent(content) : EditorState.createEmpty());
    // const [text, setText] = useState();
    const onEditorStateChange = function (editorState: typeof EditorState) {
        setEditorState(editorState);
        // const {blocks} = convertToRaw(editorState.getCurrentContent());
        /*let text = blocks.reduce((acc, item) => {
            acc = acc + item.text;
            return acc;
        }, "");*/

        // let text = editorState.getCurrentContent().getPlainText("\u0001");

        onChangeHTMLText?.(draftToHtml(convertToRaw(editorState.getCurrentContent())));

        // setText(text);
    };

    // const convertHtmlToRaw = (html: string): typeof EditorState => {
    //     const contentState = convertFromHTML({
    //         htmlToStyle: (nodeName: string, node: any, currentStyle: any) => {
    //             if (nodeName === "span" && node.className === "highlight") {
    //                 return currentStyle.add("HIGHLIGHT");
    //             } else {
    //                 return currentStyle;
    //             }
    //         },
    //     })(html);
    //     return EditorState.createWithContent(contentState);
    // };
    // const handleChangeText = useCallback((value: typeof EditorState) => {
    //     const currentSelection = value.getSelection();
    //     onChangeHTMLText?.(convertHtmlToRaw(value.getCurrentContent()));
    //     const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection);
    //     setEditorState(stateWithContentAndSelection);
    //     // eslint-disable-next-line
    // }, []);

    return (
        <>
            {/*<div>{draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div>*/}
            {/*{<div style={{height: "80px", overflow: "auto"}}>{text}</div>}*/}
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
            />
        </>
    );
}
export default memo(AllTextEditor);