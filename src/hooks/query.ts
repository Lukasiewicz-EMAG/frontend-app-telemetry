import { useQuery, useMutation, QueryClient, UseQueryResult, UseMutationResult, QueryCache } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

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

let refreshingToken = false;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error: any) => {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        await refreshAuthToken();
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

const getJWTToken = async (): Promise<string | null> => {
  try {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const url = isDev
      ? 'http://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api/token'
      : 'https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api/token';

    const response: AxiosResponse<{ access_token: string }> = await axios.post(url, {
      username: 'testuser',
      password: 'testpassword',
      superuser: false,
    });
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error('Error fetching JWT token:', error);
    return null;
  }
};

const refreshAuthToken = async (): Promise<void> => {
  if (!refreshingToken) {
    try {
      refreshingToken = true;
      const newToken = await getJWTToken();
      if (newToken) {
        setAuthToken(newToken);
        localStorage.setItem('authToken', newToken);
      } else {
        console.error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    } finally {
      refreshingToken = false;
    }
  }
};

const useAuthToken = (): string | null => {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      const decodedToken: UserTokenPayload = jwtDecode(savedToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return savedToken;
      }
    }
    return null;
  });

  useEffect(() => {
    const fetchToken = async () => {
      if (!token) {
        const newToken = await getJWTToken();
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

  useEffect(() => {
    if (token) {
      const decodedToken: UserTokenPayload = jwtDecode(token);
      const expiryTime = decodedToken.exp * 1000 - Date.now() - 60000; // 1 minute before expiry
      const timer = setTimeout(() => {
        refreshAuthToken();
      }, expiryTime);

      return () => clearTimeout(timer);
    }
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

// React Query hooks for GET and POST
const useGetData = <T,>(url: string, enabled: boolean = true): UseQueryResult<T, AxiosError> => {
  const token = useAuthToken();

  return useQuery<T, AxiosError>(
    [url],
    async () => {
      if (!token) {
        throw new Error('Token is not available');
      }
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: `https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api`,
        withCredentials: true,
      });
      return response.data;
    },
    {
      enabled: enabled && !!token, // Ensures the query runs only when the token is available
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
        queryClient.invalidateQueries([url]); // Invalidate cached GET data when a POST request is successful
      },
      onError: async (error) => {
        if (error.response?.status === 401) {
          await refreshAuthToken();
        }
        console.error('Error during POST request:', error);
      },
    }
  );
};

export { useGetData, usePostData, useAuthToken, useIsAdmin, queryClient };
