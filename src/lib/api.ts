import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const authApi = {
  login: async (email: string, password: string) => {
    // Check if in development mode
    console.log("email at authApi: ", email)
    if (process.env.NODE_ENV === 'development') {
      console.log('Using dummy authentication in development mode')
      
      // Dummy authentication
      if (email === 'test@example.com' && password === 'tD]M.{7423/h') {
        return {
          success: true,
          id: '123456',
          email: email,
          name: 'Test User',
          role: 'user',
          requires2FA: true
        }
      } else {
        throw new AxiosError('Invalid credentials', '401', undefined, undefined, {
          status: 401,
          data: { message: 'Invalid credentials' }
        } as any)
      }
    }

    // Actual API call for production
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        throw new Error("Invalid credentials")
      }
      throw new Error("Login failed. Please try again later.")
    }
  },

  verifyOtp: async (userId: string, code: string) => {
    try {
      const response = await api.post('/auth/2fa/verify', { userId, code });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        throw new Error("Invalid code")
      }
      throw new Error("Verification failed. Please try again later.")
    }
  },

  resendOtp: async (userId: string) => {
    try {
      const response = await api.post('/auth/2fa/resend', { userId });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 429) {
        throw new Error("Too many requests. Please try again later.")
      }
      throw new Error("Failed to resend code. Please try again later.")
    }
  }
};

export default api;