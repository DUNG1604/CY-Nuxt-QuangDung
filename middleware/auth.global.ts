export default defineNuxtRouteMiddleware((to, from) => {
    const exceptionPage = [
        "/login",
        "/signup",
        "/"
    ]
    if (!useCookie('token').value) {
        if (exceptionPage.includes(to.path)) return
        //return window.location.href = "/login"
        return navigateTo('/login');
    }
})