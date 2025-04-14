import { useState, useCallback } from 'react';

export interface AuthCredentials {
  email: string;
}

export interface AuthResponse {
  success: boolean;
  redirect: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  redirect?: string;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: AuthCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch('/api/trpc/authentication.login?batch=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "0": {
            "json": {
              "email": credentials.email
            }
          }
        })
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data[0]?.result?.data?.json?.success) {
        const redirectUrl = data[0].result.data.json.redirect;
        setState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: true,
          redirect: redirectUrl,
        }));
        return {
          success: true,
          redirect: redirectUrl,
        };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      }));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      };
    }
  }, []);

  const logout = useCallback(() => {
    setState({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    login,
    logout,
  };
}; 