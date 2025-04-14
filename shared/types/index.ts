export interface UserData {
  id: string;
  wcUserId: string;
  dateOfBirth: string;
  givablePoints: number;
  redeemablePoints: number;
  globalRole: string;
  createdAt: string;
  updatedAt: string;
  organizationRole: string;
  organizationId: string;
  jobTitle: string;
  joiningDate: string;
  name: string;
  email: string;
  pictureUrl: string;
  hasHrDashboardAccess: boolean;
  enterpriseId: string;
  enterpriseName: string;
}

export interface HomeScreenProps {
  userData: UserData | null;
}

export interface OTPScreenProps {
  email: string;
  onVerificationSuccess: (userData: UserData, redirect: string) => void;
}

export interface AuthResponse {
  success: boolean;
  redirect?: string;
  userData?: UserData;
  error?: string;
} 