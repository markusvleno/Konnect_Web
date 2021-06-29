import axios from "axios";

export const apiURL = "http://localhost:5000";

const api = axios.create({
    baseURL: apiURL,
    headers: { "Content-Type": "application/json; charset=utf-8" },
});

const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9._]{4,30}$/i;
const emailRegex =
    //eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const fetchUsername = (username) => {
    const data = api.post("/api/v1/username", { data: { username: username } }).then((res) => res);
    return data;
};

export const signin = (username, password) => {
    const data = api.post("/api/v1/signin", { data: { username: username, password: password } }).then((res) => res);
    return data;
};
export const signup = (email, password, username) => {};

export function matchUsername(username) {
    return usernameRegex.test(username);
}

export function matchEmail(email) {
    return emailRegex.test(email);
}
