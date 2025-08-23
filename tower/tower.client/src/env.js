export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const servePath = dev ? '' : '/tower/'
export const useSockets = false
export const domain = 'dev-eux5v4apdr8nm4hz.us.auth0.com'
export const audience = 'https://jaredcarlson.dev'
export const clientId = 'IJ7uCpAhoRnKxuddfraRi2Mry1JmDCTP'