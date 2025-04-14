import { Platform } from 'react-native';

// Export types
export * from './types';
export * from './hooks/useAuth';

// Platform-specific components
export const LoginScreen = Platform.select({
  web: () => require('../web/components/LoginScreen').LoginScreen,
  default: () => require('../mobile/components/LoginScreen').LoginScreen,
})();

export const HomeScreen = Platform.select({
  web: () => require('../web/components/HomeScreen').HomeScreen,
  default: () => require('../mobile/components/HomeScreen').HomeScreen,
})();

// Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface LoginScreenProps {
  onLoginSuccess?: () => void;
  onLoginFailure?: (error: string) => void;
}

export interface HomeScreenProps {
  username?: string;
  onLogout?: () => void;
} 