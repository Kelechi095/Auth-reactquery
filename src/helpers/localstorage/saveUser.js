export const saveUserToLocalStorage = (title, value)  => {
    if(typeof value === "string") {
        localStorage.setItem(title, value)
    } else {
        localStorage.setItem(title, JSON.stringify(value))
    }
}

// localstorage.JSON.stringify values we want to save.
//localStorage.setItem('name', 'Obaseki Nosa');


// JSON.parse values we want to receive
//JSON.parse(localStorage.getItem('user'));

// if its a string, not stringify, if object or array, stringify