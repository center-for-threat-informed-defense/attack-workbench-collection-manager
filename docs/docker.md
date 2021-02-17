# Standalone Docker Installation
The ATT&CK Workbench Frontend project includes a `docker-compose.yml` file that can be used to install all of the ATT&CK Workbench components as part of a Docker Compose installation.

This document describes an alternate method of installing the ATT&CK Workbench Collection Manager service in a Docker container without using Docker Compose.

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
This command will run the Collection Manager service by creating a Docker container and starting it.
```shell
docker run -p 3001:3001 -d --name attack-workbench-collection-manager --env WORKBENCH_HOST=http://attack-workbench-rest-api --network attack-workbench-network attack-workbench/collection-manager
```

### Collection Manager Port
The Collection Manager service listens on container port 3001 by default.
This command maps port 3001 (in the container) to port 3001 (on the host).

### ATT&CK Workbench REST API
This command sets the `WORKBENCH_HOST` environment variable to configure the Collection Manager service to access the ATT&CK Workbench REST API running on the `attack-workbench-rest-api` host on the default port of `3000`.

