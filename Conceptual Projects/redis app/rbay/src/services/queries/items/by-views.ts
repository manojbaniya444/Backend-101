import { client } from '$services/redis';
import { itemsKey, itemsByViewsKey } from '$services/keys';
import { deserialize } from './deserialize';

export const itemsByViews = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	let results: any = await client.sort(itemsByViewsKey(), {
		GET: [
			'#',
			`${itemsKey('*')}->name`,
			`${itemsKey('*')}->views`,
			`${itemsKey('*')}->endingAt`,
			`${itemsKey('*')}->price`,
			`${itemsKey('*')}->imageUrl`
		],
		BY: 'nosort',
		DIRECTION: order,
		LIMIT: {
			offset,
			count
		}
	});

	// console.log(results);
	// parsing the results [id, name, views, id, name, views, ...] -> [{id, name, views}, {id, name, views}, ...]

	const items = [];
	while (results.length) {
		const [id, name, views, endingAt, price, imageUrl, ...rest] = results;
		const item = deserialize(id, { name, views, endingAt, price, imageUrl });
		items.push(item);
		results = rest;
	}

	return items;
};
