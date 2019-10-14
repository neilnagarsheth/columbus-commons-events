import crypto from 'crypto';
import qs from 'qs'
import { SIGNING_SECRET } from '../config';

const VERSION_PREFIX = 'v0';

export const verifySignatureFromRequest = (request) => {
  const slackSignature = request.header('x-slack-signature');
  const slackTimestamp = request.header('x-slack-request-timestamp');
  const requestBodyString = qs.stringify(request.body, {format : 'RFC1738'});
  const requestSignatureString = `${VERSION_PREFIX}:${slackTimestamp}:${requestBodyString}`
  const currentSignature = `${VERSION_PREFIX}=${crypto.createHmac('sha256', SIGNING_SECRET).update(requestSignatureString).digest('hex')}`;
  if(!crypto.timingSafeEqual(Buffer.from(currentSignature, 'utf-8'), Buffer.from(slackSignature, 'utf-8'))) {
    throw new Error('Request not permitted');
  }
};
