import { client } from '$services/redis';
import { itemsKey, userLikesKey } from '$services/keys';
import { getItems } from './items';

export const userLikesItem = async (itemId: string, userId: string) => {
	const isLiked = await client.sIsMember(userLikesKey(userId), itemId);
	return isLiked;
};

export const likedItems = async (userId: string) => {
	// fetch all the item ID's from this user liked items
	const itemIds = await client.sMembers(userLikesKey(userId));
	// fetch all the item hashes with those items id
	return getItems(itemIds);
};

export const likeItem = async (itemId: string, userId: string) => {
	const inserted = await client.sAdd(userLikesKey(userId), itemId);

	if (inserted) {
		// increase the likes count of the item in the item hash
		await client.hIncrBy(itemsKey(itemId), 'likes', 1);
	}
};

export const unlikeItem = async (itemId: string, userId: string) => {
	const removed = await client.sRem(userLikesKey(userId), itemId);

	if (removed) {
		// decrease the likes count of the item in the item hash
		await client.hIncrBy(itemsKey(itemId), 'likes', -1);
	}
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
	const likedItemsIds = await client.sInter([userLikesKey(userOneId), userLikesKey(userTwoId)]);

	return getItems(likedItemsIds);
};
