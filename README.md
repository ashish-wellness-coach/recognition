# Recognition

A cross-platform authentication package for React and React Native applications.

## Features

- Cross-platform authentication support for both React and React Native
- OTP-based authentication
- Customizable UI components
- TypeScript support
- Secure storage handling

## Installation

You can install this package directly from GitHub:

```bash
npm install github:ashish-wellness-coach/recognition
```

Or using yarn:

```bash
yarn add github:ashish-wellness-coach/recognition
```

## Requirements

- React >= 18.2.0
- React Native >= 0.60.0 (for mobile)
- styled-components >= 5.0.0

## Usage

### Web Applications

```typescript
import { LoginScreen, HomeScreen } from 'recognition/web';

// Use the components in your React application
const App = () => {
  return (
    <LoginScreen 
      onLoginSuccess={(userData) => {
        // Handle successful login
      }}
      onLoginFailure={(error) => {
        // Handle login failure
      }}
    />
  );
};
```

### Mobile Applications

```typescript
import { LoginScreen, HomeScreen } from 'recognition/mobile';

// Use the components in your React Native application
const App = () => {
  return (
    <LoginScreen 
      onLoginSuccess={(userData) => {
        // Handle successful login
      }}
      onLoginFailure={(error) => {
        // Handle login failure
      }}
    />
  );
};
```

## License

MIT 