import { QueryClient, QueryCache } from '@tanstack/react-query';
import { GetJWTTokenParams } from './types';
import { useRefreshAuthToken } from './useRefreshAuthToken';

//TODO: PUT THIS IN ENV
export const DEV_USER_CREDENTIALS: GetJWTTokenParams = {
      username: 'test_7',
      password: 'testy76!!',
    }


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
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      cacheTime: 5* 60 * 1000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Avoid refetching on window focus
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 400 || error?.response?.status === 401) {
          return false; // Do not retry on 400 or 401 errors
        }
        return failureCount <= 1; // Retry other errors only once
      },
    },
  },
});

export const setAuthToken = (newToken: string) => {
  queryClient.setQueryData(['authToken'], newToken);
};

export { queryClient };
