#!/bin/bash

# run by `bash proto-gen.sh`

# execute protoloader to compile to ts
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/chat.proto

echo "proto load success"