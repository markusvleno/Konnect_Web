const _24hr = 86400000;

export const timeCalcl = (ms) => {
    if (!ms) return " ";

    if (ms < new Date(0)) return " ";

    let inputTime = new Date(ms);
    let currentTime = new Date(Date.now());

    console.log(inputTime.getTime());
    console.log(currentTime.getTime());
    let gapTime = new Date(currentTime.getTime() - inputTime.getTime());
    console.log(gapTime.getTime());
    let temp = new Date(null, null, null, null, null, 30, null);

    console.log(temp.getTime());

    if (gapTime.getTime() <= 5) return "now";
    else if (gapTime.getTime() <= _24hr) return gapTime.getHours() + " hr ago";
    else if (gapTime.getTime() <= _24hr * 2) return "Yesterday " + gapTime.toTimeString().split(" ", 1);
    else return gapTime.toLocaleDateString();
};
