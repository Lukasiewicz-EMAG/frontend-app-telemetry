
import { jwtDecode } from "jwt-decode";
import { UserTokenPayload } from "./types";
import { useAuthToken } from "./useAuthToken";
import { isDev } from "../../lib/utils";

// Always returns true in development mode.
export const useIsAdmin = (): boolean => {
    if (isDev()) return true;

    //TODO: fix this for prod
    return true;
    // const token = useAuthToken();
    // if (!token) return false;

    // const decodedToken: UserTokenPayload = jwtDecode(token);
    // return decodedToken.administrator;
};


