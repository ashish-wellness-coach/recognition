// Export types and services from auth
export { AuthService, type UserData, type AuthResponse } from './shared/services/auth';

// Export web components
export { default as LoginScreen } from './web/components/LoginScreen';
export { default as OTPScreen } from './web/components/OTPScreen';
export { default as HomeScreen } from './web/components/HomeScreen';

// Export mobile components (if any)
// export { MobileOTPScreen } from './mobile/components/OTPScreen'; 