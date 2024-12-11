import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { usersKey, usernamesUniqueKey, usernamesKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {
	// use the username argument to look up the persons user ID
	const decimalId = await client.zScore(usernamesKey(), username);

	if (!decimalId) {
		throw new Error('User doesnot exist.');
	}

	const id = decimalId.toString(16);
	// with the usernames sorted set
	const user = await client.hGetAll(usersKey(id));
	return deSerialize(id, user);
};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(usersKey(id));
	const deSerializedUser = deSerialize(id, user);
	return deSerializedUser;
};

export const createUser = async (attrs: CreateUserAttrs) => {
	// if username already exists then return the error
	const exists = await client.sIsMember(usernamesUniqueKey(), attrs.username);

	if (exists) {
		throw new Error('Username already exists');
	}

	// otherwise create the user
	const uniqueId = genId();
	const key = usersKey(uniqueId);

	await client.sAdd(usernamesUniqueKey(), attrs.username);

	await client.hSet(key, serialize(attrs));

	// can use hash/sort here to store the username and the user id
	await client.zAdd(usernamesKey(), {
		value: attrs.username,
		score: parseInt(uniqueId, 16)
	});

	return uniqueId;
};

const serialize = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};

const deSerialize = (id: string, user: { [key: string]: string }) => {
	return {
		id,
		username: user.username,
		password: user.password
	};
};
