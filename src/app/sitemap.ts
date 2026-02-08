import type { MetadataRoute } from "next";

const BASE_URL = "https://www.pixelflower.studio";
const locales = ["en", "uk", "cs"] as const;
const paths = ["/", "/about", "/work", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
	// TODO: learn this
	const getAlternates = (path: string) => ({
		languages: {
			en: `${BASE_URL}/en${path === "/" ? "" : path}`,
			uk: `${BASE_URL}/uk${path === "/" ? "" : path}`,
			cs: `${BASE_URL}/cs${path === "/" ? "" : path}`,
			"x-default": `${BASE_URL}/en${path === "/" ? "" : path}`,
		},
	});

	return [
		{
			// TODO: ?
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
			alternates: getAlternates("/"),
		},
		...locales.flatMap((locale) =>
			paths.map((path) => ({
				url: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: path === "/" ? 1 : 0.8,
				alternates: getAlternates(path),
			})),
		),
	];
}
