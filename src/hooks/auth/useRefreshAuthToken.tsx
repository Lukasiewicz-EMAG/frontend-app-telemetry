import { useState } from "react";
import { isDev } from "../../lib/utils";
import { GetJWTTokenParams } from "./types";
import { useGetJwtToken } from "./useGetJwtToken";
import { setAuthToken } from "./query";

export const useRefreshAuthToken = async ({ username, password, superuser = false }: GetJWTTokenParams): Promise<void> => {
    const [refreshingToken, setRefreshingToken] = useState(false);

    if (!isDev()) {
        throw new Error('Refreshing token is allowed only in development mode. The /token endpoint should not be used in production.');
    }

    if (!refreshingToken) {
        try {
            setRefreshingToken(true);
            const newToken = await useGetJwtToken({
                username,
                password,
                superuser,
            });
            if (newToken) {
                setAuthToken(newToken);
                localStorage.setItem('authToken', newToken);
            } else {
                console.error('Failed to refresh token');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        } finally {
            setRefreshingToken(false);
        }
    }
};
