export default defineNuxtRouteMiddleware((to
                                          ,from) => {
    const exceptionPage = [
        "/not-login",
        "/"
    ]
    if (process.client && !localStorage.getItem("token")) {
        if(exceptionPage.includes(to.path)) return
        return window.location.href = "/not-login"
    }
})