import { client } from '$services/redis';
import { itemsKey, itemsByViewsKey, itemsViewsKey } from '$services/keys';

export const incrementView = async (itemId: string, userId: string) => {
	// increment the item hash view property by 1
	// increment the item view count in the sorted set

	// increment only if the user has not viewed the item before to do this we can use hyperloglog
	const inserted = await client.pfAdd(itemsViewsKey(itemId), userId);

	// 1 if inserted and 0 if not already viewed

	if (inserted) {
		return Promise.all([
			client.hIncrBy(itemsKey(itemId), 'views', 1),
			client.zIncrBy(itemsByViewsKey(), 1, itemId)
		]);
	}
};
