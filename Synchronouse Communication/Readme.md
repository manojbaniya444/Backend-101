# Protobuf

Protobuf is a data serialization method similar to JSON. Instead of formatted string it convert it to a binary format. This binary format makes the communication super efficient on large datasets.

Due to **protobuf** `gRPC` is faster, convinient than `RPC` which uses **JSON**.

# gRPC

- Google Remote Procedure Call
- It can be compared to REST API with JSON
- It defines the communication mechanism between the client and server
- It only works on HTTP1
- gRPC uses protocol buffers as their form of communication
- The contract is defined through a `**.proto**` file where we define our `messages` and `services`
- There is not yet support for gRPC in browser
- Efficiently used for `microservices communcation`.

# In NodeJS

Running bash script to generate protobuf files

```bash
# change permission
chmod +x ./test.sh

# execute test shell command
./test.sh

# to generate protobuf
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto
```
