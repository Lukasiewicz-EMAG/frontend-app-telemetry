import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { isDev } from '../lib/utils';
import { useAuthToken } from './auth/useAuthToken';

/**
 * Hook to fetch data (GET) from a given URL
 * Uses the authentication token in Dev mode.
 * Uses cookies in any other mode (prod).
 *
 * This hook utilizes react-query's `useQuery` to perform GET requests.
 * Throws an error if the authentication token is not available.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {boolean} [enabled=true] - Whether the query should automatically run.
 * @returns {UseQueryResult<T, AxiosError>} - The result of the query, with data or an error.
 */
export const useGetData = <T,>(url: string, enabled: boolean = true): UseQueryResult<T, AxiosError> => {
  const apiBaseUrl = getConfig().TELEMETRY_DASHBOARD_API_BASE_URL;

  if (isDev()) {
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
        enabled: !!token && enabled,
      },
    );
  } else {
    // For prod we use Edx http client
    // https://openedx.github.io/frontend-platform/module-Auth.html
    return useQuery<T, AxiosError>(
      [url],
      async () => {
        const authClient = getAuthenticatedHttpClient();
        const { data, status } = await authClient.get(apiBaseUrl + url);

        if (status !== 200) {
          throw new Error(`Error: Received status code ${status}`);
        }
        return data;
      },
      {
        enabled: enabled,
      },
    );
  }
};
