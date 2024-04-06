const KEY = "APP_CONFIG";


function setStorage(obj: { [key: string]: any }) {
    const targetObj = _getItem(KEY);
    const newObj = Object.assign(targetObj, obj);
    window.localStorage.setItem(KEY, JSON.stringify(newObj))
}



function getStorage(key: string) {
    const targetObj = _getItem(KEY);
    return targetObj[key] || null;
}

const TOKEN = "ACCESS_TOKEN";
function getTokenByStorage() {
    return getStorage(TOKEN);
}
function setTokenByStorage(val: string) {
    return setStorage({ TOKEN, val });
}

function clearStorage(){
    window.localStorage.clear()
}


function _getItem(key: string) {
    const targetObj = JSON.parse((window.localStorage.getItem(key)) as any || {});
    return targetObj;
}



export {
    setStorage,
    getStorage,
    getTokenByStorage,
    setTokenByStorage,clearStorage
}

