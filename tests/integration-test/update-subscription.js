#!/usr/bin/env node

'use strict';

const authenticatedRequest = require('../../app/lib/authenticated-request');

async function updateSubscription() {
    // Get the collection index from the server
    const collectionIndexId = '43f56ef6-99a3-455d-9acc-88fce5e9dcd7';
    const getCollectionIndexesUrl = `http://localhost:3000/api/collection-indexes/${ collectionIndexId }`;
    const res = await authenticatedRequest.get(getCollectionIndexesUrl);
    const collectionIndex = res.body;

    // Add the subscription to the Green collection
    const collectionId = collectionIndex.collection_index.collections[2].id;
    collectionIndex.workspace.update_policy.subscriptions.push(collectionId);

    // Write the updated collection index to the server
    const putCollectionIndexesUrl = `http://localhost:3000/api/collection-indexes/${ collectionIndexId }`;
    await authenticatedRequest.put(putCollectionIndexesUrl, collectionIndex);
}

updateSubscription()
    .then(() => {
        console.log('updateSubscription() - Terminating normally');
        process.exit();
    })
    .catch(err => {
        console.log('updateSubscription() - Error: ' + err);
        process.exit(1);
    });

