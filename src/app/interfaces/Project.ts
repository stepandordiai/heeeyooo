export interface Project {
	id: string;
	name: string;
	desc?: string;
	date: string;
	img: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: string[];
	typo?: string;
}
