export interface LoginScreenProps {
  onLoginSuccess?: (email: string) => void;
  onLoginFailure?: (error: string) => void;
}

export interface HomeScreenProps {
  username?: string;
  onLogout?: () => void;
} 