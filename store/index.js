import createPersistedState from 'vuex-persistedstate'
import theme from './modules/theme'

const plugins = []
if (process.browser) {
    plugins.push(
        createPersistedState({
            key: 'my-app',
            storage: window.localStorage
        })
    )
}

export const actions = {
    nuxtServerInit ({ commit }, { app }) {
        const cookies = app.$cookies
        const theme = cookies.get('theme')
        if (theme === 'dark') {
            commit('theme/setTheme', true)
            this.$vuetify.theme.dark = true
        } else {
            commit('theme/setTheme', false)
            this.$vuetify.theme.dark = false
        }
    }
}

export default {
    plugins,
    modules: {
        theme
    }
}
