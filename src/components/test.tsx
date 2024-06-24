import React, {FC, memo, useState} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';



const MyEditor: FC = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    return (
        <>
            <Editor editorState={editorState} onChange={setEditorState}/>
        </>
    );
}
export default memo(MyEditor);