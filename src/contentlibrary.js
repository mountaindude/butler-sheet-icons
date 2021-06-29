'use strict';

var qrsInteract = require('qrs-interact');

const { logger } = require('./globals.js');
const { setupQseowQrsConnection } = require('./qrs.js');

/**
 * 
 * @param {*} options 
 */
const qseowVerifyContentLibraryExists = async options => {
  try {
    logger.debug('Checking if QSEoW content library already exists');

    const qseowConfigQrs = setupQseowQrsConnection(options);
    const qrsInteractInstance = new qrsInteract(qseowConfigQrs);

    const contentlibrary = options.contentlibrary;

    var apiUrl = `/contentlibrary?filter=name eq '${contentlibrary}'`;
    logger.debug(`API URL: ${apiUrl}`);

    // Test if content library already exists
    qrsInteractInstance
      .Get(apiUrl)
      .then(result => {
        if (result.statusCode === 200 && result.body.length > 0) {
          // Content library found
          logger.verbose(`Content library '${contentlibrary}' exists`);
        } else {
          // Content library mpt found
          logger.error(`Content library '${contentlibrary}' does not exist - aborting`);
          process.exit(1);
        }
      })
      .catch(err => {
        // Return error msg
        logger.error(`CONTENT LIBRARY 1: ${JSON.stringify(err, null, 2)}`);
      });
  } catch (err) {
    logger.error(`CONTENT LIBRARY 2: ${JSON.stringify(err, null, 2)}`);
  }
};

module.exports = {
  qseowVerifyContentLibraryExists,
};
