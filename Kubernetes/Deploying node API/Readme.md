## Deploying node API in minikube

1. Create a node js application
create a node js server
[node app](./backend/index.js)

2. Create a Dockerfile
[file](./backend/Dockerfile)

3. Build image and push to docker hub
step to create, build and push image.
```bash

docker build -t manoj444/mynode . # create image  username/imagename

docker run -p 8080:8080 manoj444/mynode # run image

docker container ls # list container running

docker stop <> # stop the container running

docker container rm <> # remove the container we want to run it in minikube single node cluster
```

Pushing the docker image
```bash
docker login # login first: username and password require for login in docker.

docker push username/imagename # push the image
```

4. Create k8s deployment and service
Now after creating image in docker hub now create deployment.

- First creating deployment manifest file
[deployment manifest file](./Deployment/nodeDeployment.yaml)

- Write kubernetes service manifest file
[service manifest file](./Deployment/nodeService.yaml)

- Deploying
running in minukube cluster.

```bash
minikube start # start the minikube kubernetes cluster

kubectl get pods # get any pod running

kubectl get nodes # get node

minikube dashboard # get ui

kubectl get deployments # get deployment

kubectl apply -f nodeDeployment.yaml # create deployment

kubectl apply -f nodeService.yaml # create service

kubectl get svc # get service

minikube service service-name # access the service

minikube stop # close the service

```
we can access the api via the url provided by the minikube service.

In this way we can run image on container.