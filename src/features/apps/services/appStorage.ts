import { STORAGE_KEYS } from '@/src/shared/constants/storage';
import { PAGINATION } from '@/src/shared/constants/pagination';
import { App } from '@/src/features/apps/types/app.types';
import { createMap, getLastItems } from '@/src/shared/utils/arrayUtils';

export class AppStorage {
  static getLastSelectedAppIds(): string[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LAST_SELECTED_APPS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading last selected apps from localStorage:', error);
      return [];
    }
  }

  static saveLastSelectedAppIds(appIds: string[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SELECTED_APPS, JSON.stringify(appIds));
    } catch (error) {
      console.error('Error saving last selected apps to localStorage:', error);
    }
  }

  static getLastSelectedApps(allApps: App[]): App[] {
    const appIds = this.getLastSelectedAppIds();
    const appsByAppId = createMap(allApps, (app) => app.app_id);

    return appIds
      .map((appId) => appsByAppId[appId])
      .filter((app): app is App => app !== undefined);
  }

  static updateLastSelectedApps(
    currentLastSelected: App[],
    newApp: App
  ): App[] {
    const updated = currentLastSelected.filter((app) => app.app_id !== newApp.app_id);
    updated.push(newApp);

    const lastSelected = getLastItems(updated, PAGINATION.MAX_LAST_SELECTED_APPS);

    const appIds = lastSelected.map((app) => app.app_id);
    this.saveLastSelectedAppIds(appIds);

    return lastSelected;
  }
}

