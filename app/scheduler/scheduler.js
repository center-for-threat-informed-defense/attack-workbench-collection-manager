'use strict';

const collectionIndexesService = require('../services/collection-indexes-service');
const collectionsService = require('../services/collections-service');
const logger = require('../lib/logger');
const config = require('../config/config');
const async = require('async');

let timer;
exports.initializeScheduler = function() {
    logger.info('Starting the scheduler');

    const intervalMilliseconds = config.scheduler.checkWorkbenchInterval * 1000;
    timer = setInterval(runCheckCollectionIndexes, intervalMilliseconds);
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
                                        collectionIndex.workspace.update_policy.last_retrieval = new Date(now).toISOString();

                                        collectionIndexesService.updateWorkbench(collectionIndex, function(err) {
                                            if (err) {
                                                logger.error('Unable to update collection index in workbench. ' + err);
                                                return callback(err);
                                            }
                                            else {
                                                subscriptionHandler(collectionIndex, function(err) {
                                                    return callback();
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        collectionIndex.workspace.update_policy.last_retrieval = new Date(now).toISOString();
                                        collectionIndexesService.updateWorkbench(collectionIndex, function(err) {
                                            if (err) {
                                                logger.error('Unable to update collection index in workbench. ' + err);
                                                return callback(err);
                                            }
                                            else {
                                                subscriptionHandler(collectionIndex, function(err) {
                                                    return callback();
                                                });
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

function subscriptionHandler(collectionIndex, callback) {
    async.eachSeries(collectionIndex.workspace.update_policy.subscriptions, function(collectionId, callback2) {
            collectionsService.retrieveFromWorkbench(collectionId, function(err, collections) {
                if (err) {
                    logger.error(err);
                    return callback2(err);
                }
                collections.sort((a, b) => b.stix.modified.localeCompare(a.stix.modified));
                const collectionInfo = collectionIndex.collection_index.collections.find(item => item.id === collectionId);
                if (collectionInfo) {
                    collectionInfo.versions.sort((a, b) => b.modified.localeCompare(a.modified));
                }

                if (!collectionInfo || collectionInfo.versions.length === 0) {
                    // No versions available to import
                    return callback2();
                }

                if (collections.length === 0 || collections[0].stix.modified < collectionInfo.versions[0].modified) {
                    collectionsService.retrieveByUrl(collectionInfo.versions[0].url, function(err, collectionBundle) {
                        if (err) {
                            logger.error('Unable to retrieve updated collection bundle. ' + err);
                            return callback2(err);
                        }

                        logger.info(`Downloaded updated collection bundle with id ${ collectionBundle.id }`);

                        collectionsService.importToWorkbench(collectionBundle, function (err, importedCollection) {
                            if (err) {
                                logger.error('Unable to import collection bundle into ATT&CK Workbench database. ' + err);
                                return callback2(err);
                            }
                            else {
                                logger.info(`Imported collection bundle with x-mitre-collection id ${ importedCollection.stix.id }`);
                                return callback2();
                            }
                        })
                    })
                }
                else {
                    // Don't import new version
                    return callback2();
                }
            })
        },
        function(err) {
            if (err) {
                return callback(err);
            }
            else {
                return callback();
            }
        });
}
