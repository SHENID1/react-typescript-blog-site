import {TTextEditorTextStyle} from "./types";
import cl from "./style.module.css"

export const TEXT_EDITOR_STYLE_TO_HTML = (style: TTextEditorTextStyle) => {
    switch (style) {
        case "H1":
            return <h1/>;
        case "H2":
            return <h2/>;
        case "UL":
            return <ul/>
        case "OL":
            return <ol/>
        case "BOLD":
            return <strong/>
        case "UNDERLINE":
            return <u/>
        case "HIGHLIGHT":
            return <span className={cl.highlight}/>

        default:
            return null;
    }
}