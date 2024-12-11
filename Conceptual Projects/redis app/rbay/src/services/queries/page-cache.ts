import { client } from '$services/redis';
import { pageCacheKey } from '$services/keys';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

const generateKey = (route: string) => {
	return `pagecache#${route}`;
};

export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		return client.get(pageCacheKey(route));
	} else {
		return null;
	}
};

export const setCachedPage = (route: string, page: string) => {
	if (cacheRoutes.includes(route)) {
		return client.set(pageCacheKey(route), page, {
			EX: 2
		});
	}
};
