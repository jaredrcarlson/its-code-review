export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'https://localhost:7045' : ''
export const servePath = dev ? '' : '/keepr/'
export const useSockets = false
export const domain = 'dev-eux5v4apdr8nm4hz.us.auth0.com'
export const audience = 'https://jaredcarlson.dev'
export const clientId = 'g52d0A3LtKilSekymUMshelTjAs7WGes'