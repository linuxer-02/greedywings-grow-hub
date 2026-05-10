import server from '../dist/server/server.js';
import { NodeRequest, sendNodeResponse } from 'srvx/node';

export default async function handler(req, res) {
  try {
    const webReq = new NodeRequest({ req, res });
    const webRes = await server.fetch(webReq);
    return sendNodeResponse(res, webRes);
  } catch (error) {
    console.error('SSR Handler Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
