FROM node:18

# Set Docker labels
LABEL org.opencontainers.image.title="ATT&CK Workbench Collection Manager Service" \
    org.opencontainers.image.description="This Docker image contains the REST API and services for managing collections, collection indexes, and collection subscriptions of the ATT&CK Workbench. It extends the functionality of the ATT&CK Workbench REST API with collection-management services. The application is built on Node.js and is responsible for the storage, querying, and editing of collections and their related indexes and subscriptions." \
    org.opencontainers.image.source="https://github.com/center-for-threat-informed-defense/attack-workbench-collection-manager" \
    org.opencontainers.image.documentation="https://github.com/center-for-threat-informed-defense/attack-workbench-collection-manager/README.md" \
    org.opencontainers.image.url="https://ghcr.io/center-for-threat-informed-defense/attack-workbench-collection-manager" \
    org.opencontainers.image.vendor="The MITRE Corporation" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.authors="MITRE ATT&CK<attack@mitre.org>" \
    maintainer="MITRE ATT&CK<attack@mitre.org>"

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install the app dependencies
RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
