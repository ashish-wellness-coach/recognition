import React from 'react';
import styled from 'styled-components';
import { UserData } from '@shared/types/index';

interface HomeScreenProps {
  userData: UserData | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  margin: 0 0 5px 0;
  color: #333;
  font-size: clamp(20px, 4vw, 24px);
`;

const JobTitle = styled.h2`
  margin: 0 0 5px 0;
  color: #666;
  font-size: clamp(16px, 3vw, 18px);
  font-weight: normal;
`;

const Organization = styled.p`
  margin: 0;
  color: #007bff;
  font-size: clamp(14px, 3vw, 16px);
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: clamp(18px, 4vw, 22px);
  font-weight: bold;
  color: #007bff;
`;

const StatLabel = styled.div`
  font-size: clamp(12px, 3vw, 14px);
  color: #666;
`;

const HomeScreen: React.FC<HomeScreenProps> = ({ userData }) => {
  if (!userData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>
        <ProfileImage src={userData.pictureUrl} alt={userData.name} />
        <UserInfo>
          <Name>{userData.name}</Name>
          <JobTitle>{userData.jobTitle}</JobTitle>
          <Organization>{userData.enterpriseName}</Organization>
          <Stats>
            <StatItem>
              <StatValue>{userData.givablePoints}</StatValue>
              <StatLabel>Givable Points</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userData.redeemablePoints}</StatValue>
              <StatLabel>Redeemable Points</StatLabel>
            </StatItem>
          </Stats>
        </UserInfo>
      </Header>
    </Container>
  );
};

export default HomeScreen; 