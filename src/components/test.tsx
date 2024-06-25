import type { FC } from "react";
import {TextEditor} from "./TextEditor"

const a = `<p><span class="highlight">какрй иа иукахкщаркуфзшщрщшжуэква</span></p><h2><span class="highlight"><strong>11111111111111111</strong></span></h2><ol type="1"><li><strong>посрать</strong></li><li><strong>поссать</strong></li><li><strong>пожрать</strong></li><li><strong>попить</strong></li><li><strong>спать</strong></li></ol><p></p>`;
export const TextEditorPage: FC = () => {
    return (
        <section>
            <TextEditor
                title="Text editor"
                onChangeHTMLText={(value: string) => console.log(value)}
                htmlText={a}
            />
        </section>
    );
};
