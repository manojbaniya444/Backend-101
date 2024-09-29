## Docker Volume

For syncing our data with the docker container data or persist data over time like postgresql database data.

```sh
docker run -p 8080:9000 -v ${pwd}:/app mynode # run the container with mount
```

## Adding legacy watch for nodemon to work in the container

Add in the package.json file

"nodemonConfig": {
"legacyWatch": true
}
