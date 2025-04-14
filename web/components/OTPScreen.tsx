import React, { useState } from 'react';
import styled from 'styled-components';
import { UserData } from '@shared/types/index';
import { AuthService } from '@shared/services/auth';

interface OTPScreenProps {
  email: string;
  onVerificationSuccess: (userData: UserData, redirect: string) => void;
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

const Title = styled.h1`
  text-align: center;
  margin-bottom: clamp(20px, 4vw, 30px);
  color: #333;
  font-size: clamp(24px, 5vw, 32px);
`;

const Input = styled.input`
  width: 100%;
  padding: clamp(10px, 3vw, 12px);
  margin-bottom: clamp(15px, 4vw, 20px);
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: clamp(14px, 4vw, 16px);
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: clamp(10px, 3vw, 12px);
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
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

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: clamp(12px, 3vw, 15px);
  text-align: center;
  font-size: clamp(12px, 3.5vw, 14px);
`;

const InfoText = styled.p`
  color: #6c757d;
  margin-bottom: clamp(15px, 4vw, 20px);
  text-align: center;
  font-size: clamp(12px, 3.5vw, 14px);
`;

const OTPScreen: React.FC<OTPScreenProps> = ({ email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await AuthService.verifyOTP(email, parseInt(otp, 10));
      
      if (result.success && result.userData && result.redirect) {
        AuthService.storeUserData(result.userData, result.redirect);
        onVerificationSuccess(result.userData, result.redirect);
        // Navigate to localhost instead of server URL
        window.location.href = `http://localhost:5173${result.redirect}`;
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during verification. Please try again.');
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Enter OTP</Title>
        <InfoText>Please enter the OTP sent to {email}</InfoText>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          pattern="[0-9]*"
          inputMode="numeric"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </Form>
    </Container>
  );
};

export default OTPScreen; 