# ATT&CK for Zoos Demo
ATT&CK for Zoos is a dataset designed to demonstrate the behavior of collections and collection indexes. 

## Files for the demo
- `cors-serve.py` hosts the contents of this folder to a local HTTP server at port `8082`. It enables CORS so that the application can fetch the collections and collection-indexes from this folder at `localhost:8082`.
- `demo-index.json` is the demo collection index. By default it should only contain "Zoo ATT&CK v1.0.0."
- `demo-index-v1.json` is the demo collection index with only version 1.0 of "Zoo ATT&CK".
- `demo-index-v2.json` is the demo collection index with both version 1.0.0 and 2.0.0 of "Zoo ATT&CK"
- `demo-publish.py` moves the contents of `demo-index-v2.json` into `demo-index.json`, thereby "publishing" "Zoo ATT&CK v2.0.0."
- `demo-unpublish.py` moves the contents of `demo-index-v1.json` into `demo-index.json`, resetting the index for future demos.
- `demo-collection-v1.json` contains the collection for Zoo ATT&CK v1.0.0. It contains two techniques.
- `demo-collection-v2.json` contains the collection for Zoo ATT&CK v2.0.0. It contains two techniques, one of which has additional reporting compared to `demo-collection-v1.json`.

## How to run the demo
1. Run `python3 cors-serve.py` to serve the contents of this folder to localhost:8082.
2. In your workbench, import the collection index at `localhost:8082/demo-index.json`. This will include only Zoo ATT&CK v1.0.0.
3. Subscribe to "Zoo ATT&CK" in the collection index browser. This will download Zoo ATT&CK v1.0.0.
4. While `cors-serve.py` is still running, run `demo-publish.py`. This "publishes" Zoo ATT&CK v2.0.0.
5. Your workbench should soon detect that updates are available and automatically download Zoo ATT&CK v2.0.0. 