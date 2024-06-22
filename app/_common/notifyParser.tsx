export default function notifyParser(notify : string) {

    // 대괄호 사이는 bold 처리

    const boldRegex = /\[(.*?)\]/g;
    const bold = notify.match(boldRegex);
    if (bold) {
        bold.forEach((b) => {
            notify = notify.replace(b, `<b>${b.slice(1, -1)}</b>`);
        });
    }

    return notify;


}