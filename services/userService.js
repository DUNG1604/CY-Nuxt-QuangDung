import methodService from "~/services/methodService.js";

function Login(payload) {
    return methodService().post('/login', payload);
}
function Signup(payload) {
    return methodService().post('/signup', payload);
}
function Logout(payload) {
    return methodService().post('/logout', payload);
}

export const userService = {
    Login,
    Signup,
    Logout
}