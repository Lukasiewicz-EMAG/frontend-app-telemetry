import { isDev } from "../../lib/utils";
import { fetchAuthenticatedUser } from "@edx/frontend-platform/auth";

export const useIsAdmin = async (): Promise<boolean> => {
    if (isDev()) return true;

    try {
        const authenticatedUser = await fetchAuthenticatedUser();
        // console.log('Authenticated user:', authenticatedUser);
        return authenticatedUser?.administrator === true;
    } catch (error) {
        console.error("Error fetching authenticated user:", error);
        return false;
    }
};
