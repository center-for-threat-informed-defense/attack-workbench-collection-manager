#!/usr/bin/env node

'use strict';

const authenticatedRequest = require('../../app/lib/authenticated-request');

async function initializeData() {
    // Read the collection index v1 from the file
    const collectionIndexJson = require('./mock-data/collection-index-v1.json');

    // Create the collection index object, including a subscription to the Blue collection
    const collectionIndex = {
        collection_index: collectionIndexJson,
        workspace: {
            remote_url: 'http://localhost/collection-indexes/collection-index.json',
            update_policy: {
                automatic: true,
                interval: 30,
                last_retrieval: new Date().toISOString(),
                subscriptions: [
                    collectionIndexJson.collections[0].id
                ]
            }
        }
    };

    // Import the collection index v1 into the database
    const postCollectionIndexesUrl = 'http://localhost:3000/api/collection-indexes';
    await authenticatedRequest.post(postCollectionIndexesUrl, collectionIndex);
}

initializeData()
    .then(() => {
        console.log('initializeData() - Terminating normally');
        process.exit();
    })
    .catch(err => {
        console.log('initializeData() - Error: ' + err);
        process.exit(1);
    });

