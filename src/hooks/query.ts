import { useQuery, useMutation, QueryClient, UseQueryResult, UseMutationResult, QueryCache } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { getCookie } from '../lib/utils';
import { getConfig } from '@edx/frontend-platform';
import {
  fetchAuthenticatedUser,
  getAuthenticatedHttpClient
} from '@edx/frontend-platform/auth';

interface UserTokenPayload {
  sub: string;
  preferred_username: string;
  superuser: boolean;
  administrator: boolean;
  aud: string;
  exp: number;
}

interface ApiResponse<T> {
  data: T;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error: any) => {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        console.error('Error occurred, please login again');
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
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


const useAuthToken = (): string | null => {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      const decodedToken: UserTokenPayload = jwtDecode(savedToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return savedToken;
      }
    }
    return getCookie('edx-jwt-cookie-header-payload');
  });

  useEffect(() => {
    const fetchToken = async () => {
      if (!token) {
        const newToken = getCookie('edx-jwt-cookie-header-payload');
        if (newToken) {
          setToken(newToken);
          localStorage.setItem('authToken', newToken);
        } else {
          console.error('Token not received');
        }
      }
    };

    fetchToken();
  }, [token]);

  return token;
};

const useIsAdmin = (): boolean => {
  const token = useAuthToken();
  if (token) {
    const decodedToken: UserTokenPayload = jwtDecode(token);
    return decodedToken.administrator;
  }
  return false;
};

const setAuthToken = (newToken: string) => {
  queryClient.setQueryData(['authToken'], newToken);
};


// const useGetData = <T,>(url: string, enabled: boolean = true) => {
//   const token = useAuthToken();

//   return useQuery<T, AxiosError>(
//     [url],
//     async () => {
//       if (!token) {
//         throw new Error('Token is not available');
//       }

//       const { data, status } = await getAuthenticatedHttpClient().get<T>(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         baseURL: `https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api`,
//         withCredentials: true,
//       });
      
//       if (status !== 200) {
//         throw new Error(`Error: Received status code ${status}`);
//       }
//       return data;
//     },
//     {
//       enabled: !!token && enabled,
//     }
//   );
// };
const useGetData = <T,>(url: string, enabled: boolean = true) => {
  return useQuery<T, AxiosError>(
    [url],
    async () => {
      const authenticatedUser = await fetchAuthenticatedUser(); 
      console.log('authenticatedUser', authenticatedUser)
      const authClient = getAuthenticatedHttpClient();
      console.log('authClient', authClient);
      const { data, status } = await authClient.get(`https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api` + url);
      console.log('data statis', data, status);
      
      if (status !== 200) {
        throw new Error(`Error: Received status code ${status}`);
      }
      return data;
    },
    {
      enabled: enabled,
    }
  );
};


const usePostData = <T, B>(url: string): UseMutationResult<T, AxiosError, B> => {
  const token = useAuthToken();

  return useMutation<T, AxiosError, B>(
    async (body: B) => {
      if (!token) {
        throw new Error('Token is not available');
      }
      const response: AxiosResponse<T> = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: `https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api`,
        withCredentials: true,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([url]);
      },
      onError: async (error) => {
        if (error.response?.status === 401) {
          console.error('Unauthorized error during POST request, please login again');
        }
        console.error('Error during POST request:', error);
      },
    }
  );
};

export { useGetData, usePostData, useAuthToken, useIsAdmin, queryClient };
