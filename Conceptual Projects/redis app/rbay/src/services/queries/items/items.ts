import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemsKey, itemsByViewsKey, itemsByEndingAtKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemsKey(id));

	if (Object.keys(item).length === 0) {
		return null;
	} else {
		return deserialize(id, item);
	}
};

export const getItems = async (ids: string[]) => {
	const commands = ids.map((id) => {
		return client.hGetAll(itemsKey(id));
	});

	const results = await Promise.all(commands);

	return results.map((result, index) => {
		if (Object.keys(result).length === 0) {
			return null;
		} else {
			return deserialize(ids[index], result);
		}
	});
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();

	const serialized = serialize(attrs);

	await Promise.all([
		client.hSet(itemsKey(id), serialized),
		// add item to the sorted set
		client.zAdd(itemsByViewsKey(), {
			value: id,
			score: 0
		}),
		client.zAdd(itemsByEndingAtKey(), {
			value: id,
			score: attrs.endingAt.toMillis()
		})
	]);

	return id;
};
