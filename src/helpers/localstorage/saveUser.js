export const saveUserToLocalStorage = (title, value)  => {
    if(typeof value === "string") {
        localStorage.setItem(title, value)
    } else {
        localStorage.setItem(title, JSON.stringify(value))
    }
}
