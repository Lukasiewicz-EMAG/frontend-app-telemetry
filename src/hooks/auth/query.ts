import { QueryCache, QueryClient } from '@tanstack/react-query';
import { GetJWTTokenParams } from './types';
import { useRefreshAuthToken } from './useRefreshAuthToken';

export const DEV_USER_CREDENTIALS: GetJWTTokenParams = {
  username: 'akili',
  password: 'testpassword',
  superuser: true,
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error: any) => {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        await useRefreshAuthToken(DEV_USER_CREDENTIALS);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 400 || error?.response?.status === 401) {
          return false;
        }
        return failureCount <= 1;
      },
    },
  },
});

export const setAuthToken = (newToken: string) => {
  queryClient.setQueryData(['authToken'], newToken);
};

export { queryClient };
