import { QueryCache, QueryClient } from '@tanstack/react-query';
import { GetJWTTokenParams } from './types';
import { useRefreshAuthToken } from './useRefreshAuthToken';

export const DEV_USER_CREDENTIALS: GetJWTTokenParams = {
  username: '',
  password: '',
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
      staleTime: 0,
      cacheTime: 30 * 1000,
      refetchOnWindowFocus: true,
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
