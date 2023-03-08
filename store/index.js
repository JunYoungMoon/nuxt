import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
    isDark: false
})

export const mutations = {
    setTheme (state, isDark) {
        state.isDark = isDark
    }
}

export const actions = {
    // eslint-disable-next-line require-await
    async nuxtServerInit ({ commit }, { req }) {
    // 쿠키에서 테마 설정을 가져옵니다.
        const themeCookie = req.headers.cookie?.split(';').find(c => c.trim().startsWith('theme='))

        const isDark = themeCookie ? parseJSONCookie(themeCookie.split('=')[1]) === 'dark' : false

        console.log(isDark)
        commit('setTheme', isDark)
    }
}
function parseJSONCookie (str) {
    try {
        return JSON.parse(str)
    } catch (e) {
        return str
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
