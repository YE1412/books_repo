/** @type {import('next').NextConfig} */
import PHASE_DEVELOPMENT_SERVER from 'next/constants.js';

export default (phase, {defaultConfig}) => {
	const nextConfig = {};

	const rewrites = async() => {
		return [
			// Rewrite everything to `pages/index`
			{
				source: "/:any*",
				destination: "/"	
			}
		];
	};

	if (phase === PHASE_DEVELOPMENT_SERVER){
		//nextConfig.rewrites = rewrites;
	} else {
		//nextConfig.rewrites = rewrites;
		nextConfig.logging = {
			fetches: {
				fullUrl: true,
			},
		};
	}
	return nextConfig;
}

/*const nextConfig = {

};

export default nextConfig;*/
