export interface Project {
	id: string;
	name: string;
	desc?: string;
	date: string;
	coverImage: string;
	images: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: string[];
	typo?: string;
}
