import crypto from 'crypto';
import config from 'config';

export default function verifyRequestSignature(req, res, buf) {
  const signature = req.headers['x-hub-signature'];
  const APP_SECRET = process.env.APP_SECRET
    ? process.env.APP_SECRET
    : config.get('appSecretToken');
  if (!signature) {
    // For testing, log an error.
    // In production, you should throw an error
    //eslint-disable-next-line
    console.error("Couldn't validate the signature");
  } else {
    const elements = signature.split('=');
    //eslint-disable-next-line
    const method = elements[0];
    const signatureHash = elements[1];
    const expectedHash = crypto
      .createHmac('sha1', APP_SECRET)
      .update(buf)
      .digest('hex');

    if (signatureHash !== expectedHash) {
      throw new Error("Couldn't validate the request signature");
    }
  }
}
