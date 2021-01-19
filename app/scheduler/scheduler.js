'use strict';

const collectionIndexesService = require('../services/collection-indexes-service');
const logger = require('../lib/logger');
const async = require('async');

let timer;
exports.initializeScheduler = function() {
    logger.info('Starting the scheduler');

    timer = setInterval(runCheckCollectionIndexes, 10 * 1000);
}

exports.stopScheduler = function() {
    if (timer) {
        clearInterval(timer);
    }
}

function runCheckCollectionIndexes() {
    logger.info('Scheduler running...');

    collectionIndexesService.retrieveFromWorkbench(function(err, collectionIndexes) {
        if (err) {
            logger.error('Unable to get existing collection indexes: ' + err);
        }
        else {
            logger.info(`Retrieved ${collectionIndexes.length} collection indexes`);
            async.each(collectionIndexes, function(collectionIndex, callback) {
                    if (collectionIndex.collection_index && collectionIndex.workspace.update_policy.automatic) {
                        // Is it time to retrieve the collection index from the remote URL?
                        let lastRetrieval;
                        const now = Date.now();
                        if (collectionIndex.workspace.update_policy.last_retrieval) {
                            lastRetrieval = new Date(collectionIndex.workspace.update_policy.last_retrieval);
                        }
                        if (!lastRetrieval || (now - lastRetrieval) > (1000 * collectionIndex.workspace.update_policy.interval)) {
                            logger.info('Retrieving collection index from remote url ' + collectionIndex.workspace.remote_url);
                            collectionIndexesService.retrieveByUrl(collectionIndex.workspace.remote_url, function(err, remoteCollectionIndex) {
                                if (err) {
                                    logger.error('Unable to retrieve collection index from remote url. ' + err);
                                    return callback(err);
                                }
                                else {
                                    const remoteTimestamp = new Date(remoteCollectionIndex.modified);
                                    const existingTimestamp = new Date(collectionIndex.collection_index.modified);
                                    if (remoteTimestamp > existingTimestamp) {
                                        logger.info('The retrieved collection index is newer. Updating collection index in workbench.');
                                        collectionIndex.collection_index = remoteCollectionIndex;
                                        collectionIndex.workspace.update_policy.last_retrieval = now;

                                        collectionIndexesService.updateWorkbench(collectionIndex, function(err) {
                                            if (err) {
                                                logger.error('Unable to update collection index in workbench. ' + err);
                                                return callback(err);
                                            }
                                            else {
                                                return callback();
                                            }
                                        });
                                    }
                                    else {
                                        collectionIndex.workspace.update_policy.last_retrieval = now;
                                        collectionIndexesService.updateWorkbench(collectionIndex, function(err) {
                                            if (err) {
                                                logger.error('Unable to update collection index in workbench. ' + err);
                                                return callback(err);
                                            }
                                            else {
                                                return callback();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            return callback();
                        }
                    }
                    else {
                        return callback();
                    }
                },
                function(err) {

                })
        }
    });
}
