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
  const currentUrl = window.location.href;
  //dev
  let currentUrl2: string = 'https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api';

  if (currentUrl.includes('apps.tst')) {
    //test env
    currentUrl2 = `https://tools.tst.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api`;
  } else if (currentUrl.includes('apps.compass-edu')) {
    //prod
    currentUrl2 = `https://tools.prd.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api`;
  }
  // for dev we use token from /token
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
        //const authenticatedUser = await fetchAuthenticatedUser();
        // console.log('authenticatedUser', authenticatedUser);
        const authClient = getAuthenticatedHttpClient();
        // console.log('authClient', authClient);
        const { data, status } = await authClient.get(currentUrl2 + url);
        // console.log('data statis', data, status);

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
