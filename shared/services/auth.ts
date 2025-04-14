import { UserData } from '../types/index';

export interface AuthResponse {
  success: boolean;
  redirect?: string;
  userData?: UserData;
  error?: string;
}

const API_BASE_URL = 'https://recognition.wellnesscoach.live/api';

export class AuthService {
  static async login(email: string): Promise<AuthResponse> {
    try {
      console.log('Sending login request for email:', email);
      const response = await fetch(`${API_BASE_URL}/trpc/authentication.login?batch=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "0": {
            "json": {
              "email": email
            }
          }
        })
      });

      const data = await response.json();
      console.log('Login API Response:', data);
      
      if (data[0]?.result?.data?.json?.success) {
        return {
          success: true,
          redirect: data[0].result.data.json.redirect || '/otp'
        };
      }
      
      return {
        success: false,
        error: 'Login failed'
      };
    } catch (error) {
      console.error('Login Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during login'
      };
    }
  }

  static async verifyOTP(email: string, otp: number): Promise<AuthResponse> {
    try {
      console.log('Sending OTP verification for email:', email, 'OTP:', otp);
      const response = await fetch(`${API_BASE_URL}/trpc/authentication.verifyOtp?batch=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "0": {
            "json": {
              "email": email,
              "otp": otp
            }
          }
        })
      });

      const data = await response.json();
      console.log('OTP Verification API Response:', data);
      
      if (data[0]?.result?.data?.json?.success) {
        const { userData, redirect } = data[0].result.data.json;
        const result = {
          success: true,
          redirect,
          userData
        };
        console.log('OTP Verification Success:', result);
        return result;
      }
      
      console.log('OTP Verification Failed:', data);
      return {
        success: false,
        error: 'OTP verification failed'
      };
    } catch (error) {
      console.error('OTP Verification Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during verification'
      };
    }
  }

  static storeUserData(userData: UserData, redirectPath: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('redirectPath', redirectPath);
    }
  }

  static getUserData(): UserData | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  static getRedirectPath(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('redirectPath');
    }
    return null;
  }

  static clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      localStorage.removeItem('redirectPath');
    }
  }
} 