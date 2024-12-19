import { fetchAuthenticatedUser } from '@edx/frontend-platform/auth';
import { isDev } from '../../lib/utils';

export const useIsAdmin = async (): Promise<boolean> => {
  if (isDev()) return true;

  try {
    const authenticatedUser = await fetchAuthenticatedUser();
    return authenticatedUser?.administrator === true;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    return false;
  }
};
