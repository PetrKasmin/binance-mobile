import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
    state: () => ({
        token: '',
        user: null,
    }),

    getters: {
        isAuth: (state) => !!state.token,
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    },

    actions: {
        me () {
            return useApi().me()
                .then(response => {
                    this.setUser(response);
                });
        },

        login (body: object = {}) {
            return useApi().login(body)
                .then((response) => {
                    this.setToken(response?.token ?? '');
                    useRouter().push({ name: 'index' });
                });
        },

        logout () {
            this.token = ''
            this.user = null
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            useRouter().push({ name: 'auth' });
        },

        setToken (token: string) {
            this.token = token
            localStorage.setItem('token', token);
        },

        setUser (user = null) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(this.user ?? ''))
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
