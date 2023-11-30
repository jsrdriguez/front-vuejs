export function saveLocalStorage(data, key) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function getLocalStorage(key) {
    const data = localStorage.getItem("carts");
    if (!data) return [];

    return JSON.parse(data);
}