//About Cookie for store user information use to communicate backend and frontend
import cookie from 'js-cookie'

// Set in Cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 30 Day
            expires: 30
        }) 
    }
}

// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 30
        });
    }
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

//Get in localStorage

export const getLocalStorage = key => {
    if (window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key));
    }
};



// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    // setCookie('token', response.data.token);
    setLocalStorage('employee', response.data.employee);
    next();
};

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = localStorage.getItem('employee');
        if (cookieChecked) {
            if (localStorage.getItem('employee')) {
                return JSON.parse(localStorage.getItem('employee'));
            } else {
                return false;
            }
        }else{
            // removeCookie("token");
            removeLocalStorage("user")
        }
    }
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('employee');
    next();
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};