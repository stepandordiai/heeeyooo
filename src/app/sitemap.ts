import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.heeeyooo.studio",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://www.heeeyooo.studio/about",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://www.heeeyooo.studio/work",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://www.heeeyooo.studio/contacts",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
	];
}
