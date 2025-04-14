# Recognition Authentication Package

A cross-platform authentication package that provides a seamless login experience for both React and React Native applications.

## Features

- Email-based authentication with OTP verification
- Cross-platform support (Web & React Native)
- Customizable UI components
- TypeScript support
- Secure data storage (localStorage for web, AsyncStorage for mobile)

## Installation

```bash
npm install recognition
# or
yarn add recognition
```

## Usage

### Web (React)

```tsx
import { LoginScreen, OTPScreen } from 'recognition';
import { UserData } from 'recognition/types';

function App() {
  const handleLoginSuccess = (email: string) => {
    console.log('Login successful for:', email);
  };

  const handleLoginFailure = (error: string) => {
    console.error('Login failed:', error);
  };

  const handleVerificationSuccess = (userData: UserData, redirectPath: string) => {
    console.log('Verification successful');
    // Handle user data and redirection
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onLoginFailure={handleLoginFailure}
            />
          }
        />
        <Route 
          path="/otp" 
          element={
            <OTPScreen
              email={email}
              onVerificationSuccess={handleVerificationSuccess}
            />
          }
        />
      </Routes>
    </Router>
  );
}
```

### React Native

```tsx
import { LoginScreen, OTPScreen } from 'recognition/mobile';
import { UserData } from 'recognition/types';

function App() {
  const handleLoginSuccess = (email: string) => {
    console.log('Login successful for:', email);
  };

  const handleLoginFailure = (error: string) => {
    console.error('Login failed:', error);
  };

  const handleVerificationSuccess = (userData: UserData, redirectPath: string) => {
    console.log('Verification successful');
    // Handle user data and navigation
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onLoginFailure={handleLoginFailure}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="OTP">
          {props => (
            <OTPScreen
              email={email}
              onVerificationSuccess={handleVerificationSuccess}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## API Reference

### Components

#### LoginScreen
| Prop | Type | Description |
|------|------|-------------|
| onLoginSuccess | (email: string) => void | Callback when login is successful |
| onLoginFailure | (error: string) => void | Callback when login fails |

#### OTPScreen
| Prop | Type | Description |
|------|------|-------------|
| email | string | User's email address |
| onVerificationSuccess | (userData: UserData, redirect: string) => void | Callback when OTP verification succeeds |

### Types

```typescript
interface UserData {
  id: string;
  wcUserId: string;
  name: string;
  email: string;
  pictureUrl: string;
  jobTitle: string;
  organizationId: string;
  organizationRole: string;
  enterpriseId: string;
  enterpriseName: string;
  // ... other user properties
}
```

### Custom Implementation

The package provides a `useAuth` hook for custom implementations:

```typescript
import { useAuth } from 'recognition';

function CustomLoginComponent() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (email: string) => {
    const result = await login({ email });
    // Handle result
  };
}
```

## Configuration

### Web (vite.config.ts)
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/trpc': {
        target: 'https://recognition.wellnesscoach.live/api',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
```

### React Native
No additional configuration required for React Native implementation.

## Security

- All sensitive data is stored securely (localStorage for web, AsyncStorage for mobile)
- HTTPS-only API communication
- OTP-based verification for enhanced security

## License

MIT 