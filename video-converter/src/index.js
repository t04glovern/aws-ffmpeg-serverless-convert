const s3Util = require('./s3-util'),
    childProcessPromise = require('./child-process-promise'),
    path = require('path'),
    os = require('os'),
    EXTENSION = process.env.EXTENSION,
    OUTPUT_BUCKET = process.env.OUTPUT_BUCKET,
    MIME_TYPE = process.env.MIME_TYPE,
    RESOURCE_BUCKET = process.env.RESOURCE_BUCKET,
    ICON_FILE = process.env.ICON_FILE;

exports.handler = function (eventObject, context) {
    const eventRecord = eventObject.Records && eventObject.Records[0],
        inputBucket = eventRecord.s3.bucket.name,
        key = eventRecord.s3.object.key,
        id = context.awsRequestId,
        resultKey = key.replace(/\.[^.]+$/, EXTENSION),
        workdir = os.tmpdir(),
        inputFile = path.join(workdir, id + path.extname(key)),
        iconFile = path.join(workdir, "icon.png"),
        watermarkerFile = path.join(workdir, 'watermarked-' + id + EXTENSION);

    s3Util.downloadFileFromS3(RESOURCE_BUCKET, ICON_FILE, iconFile)
        .then(() => {
            console.log('converting', inputBucket, key, 'using', inputFile);
            return s3Util.downloadFileFromS3(inputBucket, key, inputFile)
                .then(() => childProcessPromise.spawn(
                    '/opt/bin/ffmpeg',
                    ['-loglevel', 'error', '-i', inputFile, '-i', iconFile, '-filter_complex', 'overlay=10:main_h-overlay_h-10', watermarkerFile], {
                        env: process.env,
                        cwd: workdir
                    }
                ))
                .then(() => s3Util.uploadFileToS3(OUTPUT_BUCKET, resultKey, watermarkerFile, MIME_TYPE));
        })
};
