
import { jwtDecode } from "jwt-decode";
import { UserTokenPayload } from "./types";
import { useAuthToken } from "./useAuthToken";

// Custom hook `useIsAdmin` checks if the current user is an admin using auth token
// Always returns true in development mode.
export const useIsAdmin = (): boolean => {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (isDev) return true;

    const token = useAuthToken();
    if (!token) return false;

    const decodedToken: UserTokenPayload = jwtDecode(token);
    return decodedToken.administrator;
};


