# Docker Installation

## Create a Docker Image for the Collection Manager
Creating the Docker image builds the Collection Manager service, including downloading all dependencies.
This step requires access to a Docker registry, either Docker Hub or a privately hosted registry.
```shell
docker build --tag attack-workbench/collection-manager --file ./docker/Dockerfile .
```

## Create the Docker Network
The Collection Manager service needs to be able to communicate with the REST API service, and needs to be reachable by the ATT&CK Workbench Frontend application.
Create a Docker network to support this network communication. This only needs to be done once.
```shell
docker network create attack-workbench-network
```

## Create and Run a Docker Container for the Collection Manager
Run the Collection Manager service by creating a Docker container and starting it.
```shell
docker run -p 4001:3001 -d --name attack-workbench-collection-manager --env WORKBENCH_HOST=http://attack-workbench-rest-api --network attack-workbench-network attack-workbench/collection-manager
```

