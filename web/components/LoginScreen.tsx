import React, { useState } from 'react';
import styled from 'styled-components';
import { AuthService } from '@shared/services/auth';
import { useNavigate } from 'react-router-dom';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onLoginFailure: (error: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: clamp(20px, 5vw, 30px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: auto;

  @media (max-width: 480px) {
    max-width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: clamp(10px, 3vw, 12px);
  margin: clamp(6px, 2vw, 8px) 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: clamp(14px, 4vw, 16px);
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: clamp(10px, 3vw, 12px);
  margin: clamp(12px, 4vw, 16px) 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: clamp(14px, 4vw, 16px);
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorText = styled.p`
  color: #dc3545;
  margin: clamp(6px, 2vw, 8px) 0;
  text-align: center;
  font-size: clamp(12px, 3.5vw, 14px);
`;

const InfoText = styled.p`
  color: #6c757d;
  margin: clamp(6px, 2vw, 8px) 0;
  text-align: center;
  font-size: clamp(12px, 3.5vw, 14px);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: clamp(15px, 4vw, 20px);
  font-size: clamp(24px, 5vw, 32px);
`;

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthService.login(email);
      
      if (result.success) {
        onLoginSuccess(email);
        navigate(result.redirect || '/otp');
      } else {
        setError(result.error || 'Login failed');
        onLoginFailure(result.error || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onLoginFailure(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginScreen; 