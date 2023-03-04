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
        commit('theme/setTheme', theme === 'dark')
    }
}

export default {
    plugins,
    modules: {
        theme
    }
}
