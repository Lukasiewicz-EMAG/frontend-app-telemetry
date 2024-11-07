import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { UserTokenPayload } from './types';
import { useGetJwtToken } from './useGetJwtToken';
import { useRefreshAuthToken } from './useRefreshAuthToken';
import { isDev } from '../../lib/utils';

/**
 * Hook to manage and retrieve the authentication token.
 *
 * Checks for an existing token in local storage, validates it, and fetches a new one if expired.
 * Sets a timer to refresh the token before expiry.
 *
 * @returns {string | null} - The current valid token or null if unavailable.
 */
export const useAuthToken = (): string | null => {
    if (!isDev()) {
        throw new Error('useAuthToken is allowed only in development mode.');
    }
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
                const newToken = await useGetJwtToken(DEV_USER_CREDENTIALS);
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
            const expiryTime = decodedToken.exp * 1000 - Date.now() - 60000;
            const timer = setTimeout(() => {
                useRefreshAuthToken(DEV_USER_CREDENTIALS);
            }, expiryTime);

            return () => clearTimeout(timer);
        }
    }, [token]);

    return token;
};
