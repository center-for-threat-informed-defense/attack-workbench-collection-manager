---
title: ATT&CK Workbench Collection Manager v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="att-and-ck-workbench-collection-manager">ATT&CK Workbench Collection Manager v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="{protocol}://{hostname}:{port}/">{protocol}://{hostname}:{port}/</a>

    * **protocol** -  Default: http

    * **hostname** -  Default: localhost

    * **port** -  Default: 3001

<h1 id="att-and-ck-workbench-collection-manager-collection-indexes">Collection Indexes</h1>

Operations on collection indexes.

## Retrieve collection index by URL

<a id="opIdcollection-indexes-get-by-url"></a>

> Code samples

```shell
# You can also use wget
curl -X GET {protocol}://{hostname}:{port}/cm-api/collection-indexes/remote?url=string

```

```http
GET {protocol}://{hostname}:{port}/cm-api/collection-indexes/remote?url=string HTTP/1.1

```

```javascript

fetch('{protocol}://{hostname}:{port}/cm-api/collection-indexes/remote?url=string',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '{protocol}://{hostname}:{port}/cm-api/collection-indexes/remote',
  params: {
  'url' => 'string'
}

p JSON.parse(result)

```

```python
import requests

r = requests.get('{protocol}://{hostname}:{port}/cm-api/collection-indexes/remote', params={
  'url': 'string'
})

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','{protocol}://{hostname}:{port}/cm-api/collection-indexes/remote', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("{protocol}://{hostname}:{port}/cm-api/collection-indexes/remote?url=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "{protocol}://{hostname}:{port}/cm-api/collection-indexes/remote", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /cm-api/collection-indexes/remote`

This endpoint retrieves the collection index at the given URL.

<h3 id="retrieve-collection-index-by-url-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|url|query|string|true|The URL from which to retrieve the collection index.|

#### Detailed descriptions

**url**: The URL from which to retrieve the collection index.

<h3 id="retrieve-collection-index-by-url-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A collection index.|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="att-and-ck-workbench-collection-manager-collections">Collections</h1>

Operations on collections.

## Retrieve collection by URL

<a id="opIdcollections-get-by-url"></a>

> Code samples

```shell
# You can also use wget
curl -X GET {protocol}://{hostname}:{port}/cm-api/collections/remote?url=string

```

```http
GET {protocol}://{hostname}:{port}/cm-api/collections/remote?url=string HTTP/1.1

```

```javascript

fetch('{protocol}://{hostname}:{port}/cm-api/collections/remote?url=string',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '{protocol}://{hostname}:{port}/cm-api/collections/remote',
  params: {
  'url' => 'string'
}

p JSON.parse(result)

```

```python
import requests

r = requests.get('{protocol}://{hostname}:{port}/cm-api/collections/remote', params={
  'url': 'string'
})

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','{protocol}://{hostname}:{port}/cm-api/collections/remote', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("{protocol}://{hostname}:{port}/cm-api/collections/remote?url=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "{protocol}://{hostname}:{port}/cm-api/collections/remote", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /cm-api/collections/remote`

This endpoint retrieves the collection at the given URL.

<h3 id="retrieve-collection-by-url-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|url|query|string|true|The URL from which to retrieve the collection.|

#### Detailed descriptions

**url**: The URL from which to retrieve the collection.

<h3 id="retrieve-collection-by-url-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A collection.|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="att-and-ck-workbench-collection-manager-collections-indexes">Collections Indexes</h1>

## Refresh a collection index

<a id="opIdcollection-indexes-refresh"></a>

> Code samples

```shell
# You can also use wget
curl -X POST {protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh

```

```http
POST {protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh HTTP/1.1

```

```javascript

fetch('{protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post '{protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('{protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','{protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("{protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "{protocol}://{hostname}:{port}/cm-api/collection-indexes/{id}/refresh", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /cm-api/collection-indexes/{id}/refresh`

This endpoint retrieves a collection index from a remote URL and updates the database if its newer.

<h3 id="refresh-a-collection-index-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Id of the collection index to refresh|

<h3 id="refresh-a-collection-index-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The collection index was refreshed.|None|

<aside class="success">
This operation does not require authentication
</aside>

