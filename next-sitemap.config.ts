import { IConfig } from "next-sitemap";

// TODO: automatic creation of sitemap and robots
// I also have to specify postbuild: next-sitemap in package.json
const config: IConfig = {
	siteUrl: "https://heeeyooo.studio",
	generateRobotsTxt: true,
};

export default config;
