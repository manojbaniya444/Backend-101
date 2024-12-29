#!/bin/bash

# echo "Hello world"

# execute protoloader to compile to ts
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto

echo "proto load success"