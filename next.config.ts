import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// TODO:
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
				pathname: "/heeeyooo/**",
			},
		],
	},
};

export default nextConfig;
