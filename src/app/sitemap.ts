import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

const pages = [
	{
		path: "/",
		changeFrequency: "weekly",
		priority: 1,
	},
	{
		path: "/about-us",
		changeFrequency: "monthly",
		priority: 0.8,
	},
	{
		path: "/work",
		changeFrequency: "weekly",
		priority: 0.9,
	},
	{
		path: "/contact",
		changeFrequency: "monthly",
		priority: 0.7,
	},
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
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
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
			alternates: getAlternates("/"),
		},
		...routing.locales.flatMap((locale) =>
			pages.map((page) => ({
				url: `${BASE_URL}/${locale}${page.path === "/" ? "" : page.path}`,
				lastModified: new Date(),
				changeFrequency: page.changeFrequency,
				priority: page.priority,
				alternates: getAlternates(page.path),
			})),
		),
	];
}
