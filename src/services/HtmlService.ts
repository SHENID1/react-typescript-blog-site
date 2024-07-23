export default class HtmlService {
    static extractContent(s: string, space: boolean) {
        const span = document.createElement('span');
        span.innerHTML = s;
        if (space) {
            let children = span.querySelectorAll('*');
            for (let i = 0; i < children.length; i++) {
                if (children[i].textContent)
                    children[i].textContent += ' ';
                // else
                //     children[i].innerText += ' ';
            }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g, ' ');
    }
}