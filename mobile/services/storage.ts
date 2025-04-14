import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '@shared/types/index';

export class MobileStorage {
  static async storeUserData(userData: UserData, redirectPath: string): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        ['userData', JSON.stringify(userData)],
        ['redirectPath', redirectPath],
      ]);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  static async getUserData(): Promise<UserData | null> {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  static async getRedirectPath(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('redirectPath');
    } catch (error) {
      console.error('Error getting redirect path:', error);
      return null;
    }
  }

  static async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(['userData', 'redirectPath']);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }
} 