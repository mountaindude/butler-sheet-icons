/* eslint-disable no-console */
import { test, expect, describe } from '@jest/globals';

import { qseowCreateThumbnails } from '../qseow-create-thumbnails.js';

const defaultTestTimeout = process.env.BSI_TEST_TIMEOUT || 1200000; // 20 minute default timeout

console.log(`Jest timeout: ${defaultTestTimeout}`);

const options = {
    loglevel: process.env.BSI_LOG_LEVEL || 'verbose',
    engineport: process.env.BSI_ENGINE_PORT || '4747',
    qrsport: process.env.BSI_QRS_PORT || '4242',
    schemaversion: process.env.BSI_SCHEMA_VERSION || '12.612.0',
    certfile: process.env.BSI_CERT_FILE || '../../cert/client.pem',
    certkeyfile: process.env.BSI_CERT_KEY_FILE || '../../cert/client_key.pem',
    prefix: process.env.BSI_PREFIX || '',
    secure: process.env.BSI_SECURE || 'true',
    headless: process.env.BSI_HEADLESS || 'true',
    pagewait: process.env.BSI_PAGE_WAIT || '3',
    imagedir: process.env.BSI_IAMGE_DIR || 'img',
    contentlibrary: process.env.BSI_CONTENT_LIBRARY,
    host: process.env.BSI_HOST,
    appid: process.env.BSI_APP_ID || 'a3e0f5d2-000a-464f-998d-33d333b175d7',
    apiuserdir: process.env.BSI_API_USER_DIR || 'Internal',
    apiuserid: process.env.BSI_API_USER_ID || 'sa_api',
    logonuserdir: process.env.BSI_LOGON_USER_DIR,
    logonuserid: process.env.BSI_LOGON_USER_ID,
    logonpwd: process.env.BSI_LOGON_PWD,
    includesheetpart: process.env.BSI_INCLUDE_SHEET_PART || 1,
    qliksensetag: process.env.BSI_QLIK_SENSE_TAG || '',
    senseVersion: process.env.BSI_SENSE_VERSION,
};

/**
 * Create thumbnails with non-existing content library specified
 * Should fail
 */
options.contentlibrary = 'abc 12';
test(
    'qseow create sheet thumbnails, non-existing content library (should fail)',
    async () => {
        const data = await qseowCreateThumbnails(options);
        expect(data).toBe(false);
    },
    defaultTestTimeout
);
