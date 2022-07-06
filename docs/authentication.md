# Authentication

The collection manager service must authenticate with the REST API in order to retrieve and update data.
It can be configured to do this either using API Key Challenge authentication or the OIDC Client Credentials Flow.

### API Key Challenge Authentication

API Key Challenge authentication works by configuring both the REST API and the Collection Manager service with a secret value that is used to authenticate the service to the REST API.
The following environment variables must be set to configure the Collection Manager service to use API key authentication: 

| name                             | value                          | description                                                        |
|----------------------------------|--------------------------------|--------------------------------------------------------------------|
| **WORKBENCH_AUTHN_MECHANISM**    | `apikey` (default)             | Sets the type of authentication to use                             |
| **WORKBENCH_AUTHN_SERVICE_NAME** | `collection_manager` (default) | Name of the service                                                |
| **WORKBENCH_AUTHN_APIKEY**       | _apikey_                       | Shared secret; the REST API must be configured with the same value |

### Client Credentials Authentication

Client credentials authentication works by configuring the Collection Manager service to use the OIDC Client Credentials Flow.
The Collection Manager will retrieve an access token from the OIDC Identity Provider and provide that token to the REST API service.
The OIDC Identity Provider must be configured to operate with the OIDC Client Credentials Flow.
The procedure for that is specific to the OIDC vendor.
The following environment variables must be set to configure the Collection Manager service to use client credentials authentication:

| name                              | value                | description                                                                |
|-----------------------------------|----------------------|----------------------------------------------------------------------------|
| **WORKBENCH_AUTHN_MECHANISM**     | `client-credentials` | Sets the type of authentication to use                                     |
| **WORKBENCH_AUTHN_CLIENT_ID**     | _client id_          | client_id of the service as configured with the OIDC Identity Provider     |
| **WORKBENCH_AUTHN_CLIENT_SECRET** | _client secret_      | client_secret of the service as configured with the OIDC Identity Provider |
| **WORKBENCH_AUTHN_TOKEN_URL**     | _token url_            | URL of the token request endpoint of the OIDC Identity Provider            |

