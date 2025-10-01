// TODO: automatic creation of sitemap and robots
// I also have to specify postbuild: next-sitemap in package.json
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const siteUrl = "https://www.heeeyooo.studio"; // замініть на ваш домен

const config = {
	siteUrl,
	generateRobotsTxt: true, // Створює robots.txt
};

export default config;
