import axios from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  deleteTokens,
} from './tokenStorage'
import { refreshToken as refreshAuthToken } from './userApi'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  console.warn('API_BASE_URL is not set in your .env file.')
  console.log('Using default placeholder URL.')
}

const apiClient = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:8000/api/',
  timeout: 10000,
})

// --- 1. Request Interceptor ---
// Add the access token to every request
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// --- 2. Response Interceptor ---
// Handle 401 errors (expired tokens) by trying to refresh
apiClient.interceptors.response.use(
  (response) => response, // All 2xx responses pass through
  async (error) => {
    const originalRequest = error.config

    // Check for 401 error and ensure it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const currentRefreshToken = await getRefreshToken()
        if (!currentRefreshToken) {
          // If no refresh token, logout (or redirect to login)
          await deleteTokens()
          // You might want to redirect to login here using the router
          return Promise.reject(error)
        }

        // --- Call the refresh token API ---
        const response = await refreshAuthToken(currentRefreshToken)
        const { access, refresh } = response.data

        // Save new tokens
        await saveTokens(access, refresh)

        // Update the header of the original request
        originalRequest.headers.Authorization = `Bearer ${access}`

        // Retry the original request
        return apiClient(originalRequest)
      } catch (refreshError) {
        // If refresh fails, delete all tokens and reject
        await deleteTokens()
        // You might want to redirect to login here
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
