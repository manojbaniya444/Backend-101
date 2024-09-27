import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	await client.hSet('car1', {
		color: 'red',
		year: 1990,
	});

	await client.hSet('car2', {
		color: 'green',
		year: 1995,
	});

	await client.hSet('car3', {
		color: 'orange',
		year: 2000,
	});

	const commands = [1,2,3].map((item) => {
		return client.hGetAll(`car${item}`)
	})

	// pipelining
	const results = await Promise.all(commands)

	console.log(results)

	
};
run();
