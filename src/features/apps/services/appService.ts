import { API_ENDPOINTS } from '@/src/shared/constants/api';
import { App } from '@/src/features/apps/types/app.types';

export class AppService {
  static async fetchApps(): Promise<App[]> {
    try {
      const response = await fetch(API_ENDPOINTS.APPS);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch apps: ${response.statusText}`);
      }

      const apps: App[] = await response.json();
      return apps;
    } catch (error) {
      console.error('Error fetching apps:', error);
      throw error;
    }
  }
}

