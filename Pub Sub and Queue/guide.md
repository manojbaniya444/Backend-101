# setup redis in docker container
```bash
docker run -d -p 6379:6379 redis

docker exec -it container /bin/bash

redis-cli
```

# Redis command
```shell
SET mykey "abc12" # set key

GET mykey  # get the mykey

DEL mykey # delete the key

HSET user:100 name "Jane" email "jane@gmail.com" age "10" # hash set
HGET user:100 name

SET user:100 "[{name: "Jane", email: "jane@gmail.com"}]" # later parse it
```

# Redis as a Queue
We can also push to a topic/queue on redis and other processes can pop from it.

```bash
LPUSH value 1 # push to the queue from the left side
LPUSH value 2 # push another value

RPOP value # pop from right -> 1
RPOP value # 2
RPOP value # null

BRPOP value 0 # blocking pop from right -> blocking for infinite (0) or n second in 0 until someone pushes to the queue
```

# Setup server
```shell
npm init -y
npm i express
npm i @types/express

npx tsc --init

npm i redis
```

# setup worker
install redis only here

# run the tsc code
```bash
npx tsc -b # compile
node dist/index.js
```
create a redis client.