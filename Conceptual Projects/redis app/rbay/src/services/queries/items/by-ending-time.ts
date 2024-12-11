import { client } from '$services/redis';
import { itemsByEndingAtKey, itemsKey } from '$services/keys';
import { deserialize } from './deserialize';

export const itemsByEndingTime = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	const ids = await client.zRange(itemsByEndingAtKey(), Date.now(), '+inf', {
		BY: 'SCORE',
		LIMIT: {
			offset,
			count
		}
	});

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
