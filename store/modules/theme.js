export default {
    namespaced: true,
    state: () => ({
        isDark: false
    }),
    mutations: {
        setTheme (state, isDark) {
            state.isDark = isDark
        }
    }
}
