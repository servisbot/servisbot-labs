/* eslint-disable max-len */
module.exports = {
  Records: [
    {
      eventVersion: '2.1',
      eventSource: 'aws:s3',
      awsRegion: 'us-east-1',
      eventTime: '2020-05-13T09:56:06.392Z',
      eventName: 'ObjectCreated:Put',
      userIdentity: {
        principalId: 'AWS:AROAV44VE3GEF6PLWOF24:test@servisbot.com'
      },
      requestParameters: {
        sourceIPAddress: '86.41.11.85'
      },
      responseElements: {
        'x-amz-request-id': 'F29FA2E383AD7F60',
        'x-amz-id-2': 'TAf0LIb9C1TjnHO5LHo058AeISN2EplNKWQaczfDBDdE8eRDu0cgJZhLGdBL7lKIBlbBv+QFapnKeDgCQJwkzZ5tMEtQFtpBhryuj024cvQ='
      },
      s3: {
        s3SchemaVersion: '1.0',
        configurationId: '426aaaa9-559c-44a9-b401-b1d243abb044',
        bucket: {
          name: 'stg-servisbot-webspray-emailstorage-yourorg',
          ownerIdentity: {
            principalId: 'AIF70R8YRPRY8'
          },
          arn: 'arn:aws:s3:::stg-servisbot-webspray-emailstorage-yourorg'
        },
        object: {
          key: 'sample-ses-email.txt',
          size: 3806,
          eTag: '96c5e7e6a52ba17b5981b6cf304764e4',
          sequencer: '005EBBC43A4D892F65'
        }
      }
    }
  ]
};
