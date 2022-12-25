import { useAuth } from '~/stores/auth';
import { useTheme } from '~/stores/theme';

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuth();
    const theme = useTheme();

    const localTheme= localStorage.getItem('theme');
    if (localTheme) {
        theme.setTheme(localTheme);
    }

    const localUser = localStorage.getItem('user');
    if (localUser) {
        auth.setUser(JSON.parse(localUser));
    }

    const localToken = localStorage.getItem('token');
    if (localToken) {
        auth.setToken(localToken);
    }

    if (!!auth.getToken && !auth.getUser) {
        auth.me()
    }

    if (!auth.isAuth && to.name !== 'auth') {
        return navigateTo({ name: 'auth' });
    }
})