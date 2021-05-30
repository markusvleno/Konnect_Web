import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

const usernameRegex = new RegExp("/^[a-zA-Z_][a-zA-Z0-9._]{5,30}$/", "i");
//const emailRegex = new RegExp("/^([a-zA-Z_.]+)@([a-zA-Z]+).([a-zA-Z]){2,7}$/", "i");

export async function validUsername(username) {
    return await (
        await api.get("/username", { params: { username: username } })
    ).data.available;
}

export function matchUsername(username) {
    return usernameRegex.test(username);
}

export default api;
