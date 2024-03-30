const ACCESS_TOKEN = "ACCESS_TOKEN";
const DB = "DB";

function getLocal(key: string) {
    const objStr = window.localStorage.getItem(key);
    let res = null;
    try {
        res = JSON.parse(objStr as string);
    } catch (e) {
        res = objStr;
    }
    return res;
}

function setLocal(key: string, val: unknown) {
    if (typeof val === "string") {
        return window.localStorage.setItem(key, val);
    }
    const old = getLocal(key);
    const newTarget = Object.assign(old, val);
    window.localStorage.setItem(key, JSON.stringify(newTarget));
}

function setToken2Local(val: string) {
    setLocal(ACCESS_TOKEN, val);
}

function getToken2Local() {
    return getLocal(ACCESS_TOKEN);
}


export {
    getToken2Local,
    setToken2Local
}
