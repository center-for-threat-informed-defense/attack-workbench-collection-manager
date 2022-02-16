#!/bin/node

/**
 * This script configures the keycloak server for testing with ATT&CK Workbench by adding the
 * Collection Manager as a service.
 *
 * The Keycloak server URL is currently hardcoded in this script at localhost:8080.
 *
 * Configuring the keycloak server includes:
 *   - Adding the Collection Manager service as a client (attack-workbench-collection-manager)
 *   - It assumes that the 'test-oidc-realm' realm has already been created
 *
 * Usage:
 *   node ./resources/scripts/add-service-to-keycloak.js
 *
 */

'use strict';

const KeycloakAdminClient = require('keycloak-admin-client');

const adminCredentials = {
    username: 'admin',
    password: 'admin',
    grant_type: 'password',
    client_id: 'admin-cli'
};

const baseUrl = 'http://localhost:8080/auth';
const realmName = 'test-oidc-realm';
const clientId = 'attack-workbench-collection-manager';
const clientSecret = 'e3b3e067-f8e6-45d6-9472-cd75cb6c6ce8';

async function addServiceToKeycloak() {
    const adminClient = await new KeycloakAdminClient({ baseUrl, ...adminCredentials });

    const clientOptions = {
        clientId,
        name: clientId,
        description: 'Collection Manager',
        enabled: true,
        serviceAccountsEnabled: true,
        secret: clientSecret
    };

    const createdClient = await adminClient.clients.create(realmName, clientOptions);
}

addServiceToKeycloak()
    .then(() => process.exit())
    .catch(err => {
        console.log('addServiceToKeycloak() - Error: ' + err);
        process.exit(1);
    });
