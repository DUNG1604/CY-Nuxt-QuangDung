export default function methodService() {
    const customFetch = useNuxtApp().$customFetch; // Lấy customFetch từ Nuxt App

    const post = (endpoint, data) => {
        return customFetch(endpoint, { method: 'POST', body: data });
    };

    const get = (endpoint, params = {}) => {
        return customFetch(endpoint, { method: 'GET', params });
    };

    const del = (endpoint) => {
        return customFetch(endpoint, { method: 'DELETE' });
    };

    const put = (endpoint, data) => {
        return customFetch(endpoint, { method: 'PUT', body: data });
    };

    return {
        post,
        get,
        del,
        put,
    };
}
