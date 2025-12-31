import { defineRouting } from "next-intl/routing";

// TODO: LEARN THIS
export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "uk"],

	// Used when no locale matches
	defaultLocale: "en",

	// "always" ensures that /en or /uk is ALWAYS in the URL.
	// "as-needed" (default) might hide it for the default locale.
	localePrefix: "always",
});
