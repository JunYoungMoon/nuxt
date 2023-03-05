import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
    isDark: false
})

export const mutations = {
    setTheme (state, isDark) {
        state.isDark = isDark
    }
}

export const plugins = process.browser
    ? [
        createPersistedState({
            key: 'my-app',
            storage: window.localStorage
        })
    ]
    : []
