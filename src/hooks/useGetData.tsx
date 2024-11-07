import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAuthToken } from "./auth/useAuthToken";

/**
 * Hook to fetch data from a given URL using the authentication token.
 * 
 * This hook utilizes react-query's `useQuery` to perform GET requests.
 * Throws an error if the authentication token is not available.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {boolean} [enabled=true] - Whether the query should automatically run.
 * @returns {UseQueryResult<T, AxiosError>} - The result of the query, with data or an error.
 */
export const useGetData = <T,>(url: string, enabled: boolean = true): UseQueryResult<T, AxiosError> => {
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
        }
    );
};

