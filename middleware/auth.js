export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated } = useAuth()

    // List of public routes that don't require authentication
    const publicRoutes = ['/', '/register']

    if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    if (isAuthenticated.value && publicRoutes.includes(to.path)) {
        return navigateTo('/buckets')
    }
})