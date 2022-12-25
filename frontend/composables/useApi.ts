export const useApi = () => {
    const config = useAppConfig();

    const methods = {
        GET: 'GET',
        POST: 'POST',
    }

    const apiTransport = async (method = methods.GET, route = 'get', {
        params = {},
        query = {},
        body = {},
    } = {}) => {
        try {
            const options = method === methods.GET ? {} : {
                method,
                params,
                body,
            };

            const { data } = await useFetch(`api/${route}?${new URLSearchParams(query)}`, {
                baseURL: config?.env?.api,
                ...options,
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    Authorization: localStorage.getItem('token') ?? '',
                },
            })

            console.log(data.value)

            return JSON.parse(String(data.value));
        } catch (e) {
            console.log(e);
        }
    }

    return {
        // Авторизованный
        me: async () => {
            return apiTransport(methods.GET, 'me', {})
        },
        // Авторизация
        login: async (body = {}) => {
            return apiTransport(methods.POST, 'login', { body })
        },
    }
}
