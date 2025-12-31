import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// TODO: LEARN THIS
export default createMiddleware(routing);

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
