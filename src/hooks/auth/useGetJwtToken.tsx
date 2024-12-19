import axios, { AxiosResponse } from "axios";
import { isDev } from "../../lib/utils";
import { GetJWTTokenParams } from "./types";



const TOKEN_ENDPOINT = 'http://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api/token';

/**
 * Retrieves a JWT token from the development API.
 * 
 * Note: This function should only be used in development mode as the endpoint
 * is not intended for production use. If used outside of development, it will
 * throw an error.
 * 
 * @param {GetJWTTokenParams} params - The parameters for the token request, including username, password, and optional superuser flag.
 * @returns {Promise<string | null>} - A promise that resolves with the JWT token as a string or null if an error occurs.
 */
export const useGetJwtToken = async ({
    username,
    password,
    superuser = true,
}: GetJWTTokenParams): Promise<string | null> => {
    if (!isDev()) {
        throw new Error('Fetching token from API is allowed only in development mode. The /token endpoint should not be used in production.');
    }

    try {
        const response: AxiosResponse<{ access_token: string }> = await axios.post(TOKEN_ENDPOINT, {
            username,
            password,
            superuser,
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching JWT token:', error);
        return null;
    }
};


