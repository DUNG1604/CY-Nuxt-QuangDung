export default function methodService() {
    const customFetch = useNuxtApp().$customFetch();

    const post = (endpoint, data) => {
        return customFetch(endpoint, { method: 'POST', body: data });
    };

    const get = (endpoint, params = {}) => {
        return customFetch(endpoint, { method: 'GET', params });
    };

    return {
        post,
        get,
    };
}
