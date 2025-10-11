import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "8000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "via.placeholder.com",
			},
		],
	},
};

export default nextConfig;
