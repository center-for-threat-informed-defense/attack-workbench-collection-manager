# ATT&CK Workbench Collection Manager

The ATT&CK Workbench is an application allowing users to **explore**, **create**, **annotate**, and **share** extensions of the MITRE ATT&CK® knowledge base. 

This repository contains the REST API and services for managing collections, collection indexes, and collection subscriptions. It is a Node.js application extending the functionality of the [ATT&CK Workbench REST API](https://github.com/center-for-threat-informed-defense/attack-workbench-rest-api) with collection-management services.

The ATT&CK Workbench application requires additional components for full operation. The [ATT&CK Workbench Frontend](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend) repository contains the full documentation of the scope and function of the project. See the [install and run](#install-and-run) instructions for more details about setting up the entire project.

## Collection Manager Documentation

When running with the NODE_ENV environment variable set to `development`, the app hosts a description of the Collection Manager using the Swagger UI module.
The Collection Manager documentation can be viewed using a browser at the path `/api-docs`.

For a basic installation on the local machine this documentation can be accessed at `http://localhost:3001/api-docs`.

The [docs](/docs/README.md) folder contains additional documentation about using the Collection Manager:
- [standalone docker installation](/docs/docker.md): instructions for setting up the Collection Manager via docker. Note that this is not the same as the full [ATT&CK Workbench Docker Installation](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/docker-compose.md).
- [contributing](/docs/contributing.md): information about how to contribute to this project.

## Install and run

The ATT&CK Workbench application is made up of several repositories. For the full application to operate each needs to be running at the same time. The [docker install instructions](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/docker-compose.md) will install all components and is recommended for most deployments.
- [ATT&CK Workbench Frontend](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend) 
  
  The front-end user interface for the ATT&CK Workbench tool, and the primary interface through which the knowledge base is accessed.
- [ATT&CK Workbench REST API](https://github.com/center-for-threat-informed-defense/attack-workbench-rest-api)

  REST API service for storing, querying and editing ATT&CK objects.
- [ATT&CK Workbench Collection Manager](https://github.com/center-for-threat-informed-defense/attack-workbench-collection-manager)  (this repository)

  REST API and services for managing collections, collection indexes, and collection subscriptions. 
  
  The collection manager is **not** required to be installed to use the ATT&CK Workbench, but is highly recommended. If you opt not to install the collection-manager you will not be able to import or export data from your local knowledge base. If the collection manager is not installed, set `integrations.collection_manager.enabled` to `false` in the front-end environment. See [modifying the environment](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend#modifying-the-environment) for more details.

The manual install instructions in each repository describe how each component to be deployed to a separate machine or with customized settings. 

### Installing using Docker
Please refer to our [Docker install instructions](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/docker-compose.md) for information on installing and deploying the app using Docker. The docker setup is the easiest way to deploy the application.

### Manual Installation

#### Requirements

- [Node.js](https://nodejs.org) version `14.16.1` or greater

#### Installation

##### Step 1. Clone the git repository

```
git clone git@github.com:center-for-threat-informed-defense/attack-workbench-collection-manager.git
cd attack-workbench-collection manager
```

##### Step 2. Install the dependencies

The ATT&CK Workbench Collection Manager installs all dependencies within the project.
It doesn't depend on the global installation of any modules.

```
npm install
```

##### Step 3. Configure the system

The app can be configured using environment variables, a configuration file, or a combination of these methods.
Note that any values set in a configuration file take precedence over values set using environment variables.

###### Using Environment Variables

| name                            | required | default                 | description                                                        |
|---------------------------------|----------|-------------------------|--------------------------------------------------------------------|
| **PORT**                        | no       | `3001`                  | Port the HTTP server should listen on                              |
| **ENABLE_CORS_ANY_ORIGIN**      | no       | `true`                  | Allows requests from any domain to access the REST API endpoints   |
| **NODE_ENV**                    | no       | `development`           | Environment that the app is running in                             |
| **WORKBENCH_REST_API_BASE_URL** | no       | `http://localhost:3000` | Base URL for the [ATT&CK Workbench REST API](https://github.com/center-for-threat-informed-defense/attack-workbench-rest-api)  |
| **CHECK_WORKBENCH_INTERVAL**    | no       | `10`                    | The frequency in seconds of synchronization with the [ATT&CK Workbench REST API](https://github.com/center-for-threat-informed-defense/attack-workbench-rest-api)   |
| **JSON_CONFIG_PATH**            | no       | ``                      | Location of a JSON file containing configuration values            |

###### Using a Configuration File

If the `JSON_CONFIG_PATH` environment variable is set, the app will also read configuration settings from a JSON file at that location.

| name                                 | type     | corresponding environment variable |
|--------------------------------------|----------|------------------------------------|
| **server.port**                      | int      | PORT                               |
| **server.enableCorsAnyOrigin**       | boolean  | ENABLE_CORS_ANY_ORIGIN             |
| **app.env**                          | string   | NODE_ENV                           |
| **workbench.restApiBaseUrl**         | string   | WORKBENCH_REST_API_BASE_URL        |
| **scheduler.checkWorkbenchInterval** | int      | CHECK_WORKBENCH_INTERVAL           |

Sample configuration file setting the server port and database url:

```json
{
  "server": {
    "port": 4001
  },
  "workbench": {
    "restApiBaseUrl": "http://localhost:4000"
  },
  "scheduler": {
    "checkWorkbenchInterval": 60
  }
}
```

##### Step 4. Run the app

```
node ./bin/www
```

## Scripts

`package.json` contains a number of scripts that can be used to perform recurring tasks.

### JavaScript Linter

Use the command:

`npm run lint`

to run ESLint on the codebase.

### Validate Module Versions

Use the command

`npm run snyk`

to run the Snyk validator on the currently installed modules.
This will check the modules for known security flaws.

Note that this requires the `SNYK_TOKEN` environment variable to be set to a valid Snyk token to run.

## Notice 

Copyright 2020-2021 MITRE Engenuity. Approved for public release. Document number CT0020

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at 

http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. 

This project makes use of ATT&CK®

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)
