import os
import shutil
# write the contents of demo-index-v2.json into demo-index.json

os.remove("demo-index.json")
shutil.copyfile("demo-index-v1.json", "demo-index.json")