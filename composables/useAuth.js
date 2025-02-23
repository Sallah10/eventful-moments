export const useAuth = () => {
    const token = useCookie('token')
    const user = ref(null)
    const isAuthenticated = computed(() => !!token.value)

    const setAuth = (userData, tokenValue) => {
        user.value = userData
        token.value = tokenValue
    }

    const clearAuth = () => {
        user.value = null
        token.value = null
    }

    return {
        user,
        token,
        isAuthenticated,
        setAuth,
        clearAuth
    }
}