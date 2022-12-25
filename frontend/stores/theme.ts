import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', {
    state: () => ({
        type: 'light',
    }),

    getters: {
        getThem: (state) => state.type,
        getIcon: (state) => state.type === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night',
    },

    actions: {
        setTheme (theme: string = '') {
            this.type = theme;
            localStorage.setItem('theme', theme);
        },
    },
})
