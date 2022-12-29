import { createVuetify } from 'vuetify'
import {
    VApp,
    VBtn,
    VSheet,
    VCard,
    VForm,
    VTextField,
    VLayout,
    VContainer,
    VProgressCircular,
    VMain,
    VAppBar,
    VAppBarNavIcon,
    VAppBarTitle,
    VSpacer,
    VNavigationDrawer,
    VBottomNavigation,
    VList,
    VListItem,
    VDivider,
} from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        components: {
            VApp,
            VMain,
            VAppBar,
            VAppBarNavIcon,
            VAppBarTitle,
            VSpacer,
            VNavigationDrawer,
            VBottomNavigation,
            VBtn,
            VLayout,
            VSheet,
            VProgressCircular,
            VContainer,
            VCard,
            VForm,
            VTextField,
            VList,
            VListItem,
            VDivider,
        },
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            }
        },
    })

    nuxtApp.vueApp.use(vuetify)
})