const _24hr = 86400000;

export const timeCalcl = (ms) => {
    if (!ms) return " ";

    if (ms < new Date(0)) return " ";

    const currentTime = new Date(Date.now());
    const inputTime = new Date(ms);

    // let inputInHr = inputTime.getHours() > 12 ? inputTime.getHours() - 12 : inputTime.getHours();
    // let inputInM = inputTime.getMinutes();
    // let inputInS = inputTime.getSeconds();

    let gapTime = inputTime.getTime() - currentTime.getTime();

    if (gapTime < _24hr) return inputTime.toLocaleTimeString().slice(0, -3);
    else return inputTime.toLocaleDateString();
};

export const getConversation = (userId) => {
    const prevConversation = localStorage.getItem(String(userId));
    return prevConversation ? JSON.parse(prevConversation)[0] : [];
};

export const putConversation = (userId, convObj) => {
    if (!userId || !convObj) return;

    localStorage.removeItem(String(userId));
    localStorage.setItem(String(userId), JSON.stringify([convObj]));
};
