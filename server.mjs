import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const appFingerprint = 'CGFB-2026-N7Q4-X1K8';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function getCorsHeaders(request) {
  const origin = request.headers.origin || '';
  const isLocalhost = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(origin);
  const allowOrigin = allowedOrigins.includes('*') || allowedOrigins.includes(origin) || isLocalhost
    ? origin
    : '';
  if (!allowOrigin) return {};
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function sendJson(request, response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    ...getCorsHeaders(request),
  });
  response.end(JSON.stringify(payload));
}

function readLocalPage(targetPort, timeoutMs = 1200) {
  return new Promise((resolve) => {
    const request = http.request({
      hostname: '127.0.0.1',
      port: targetPort,
      path: '/',
      method: 'GET',
      timeout: timeoutMs,
    }, (response) => {
      const chunks = [];
      response.setEncoding('utf8');
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode || 0,
          body: chunks.join(''),
        });
      });
    });

    request.on('timeout', () => request.destroy());
    request.on('error', () => resolve(null));
    request.end();
  });
}

async function isCurrentAppAlreadyRunning(targetPort) {
  const payload = await readLocalPage(targetPort);
  if (!payload || payload.statusCode !== 200) return false;
  return payload.body.includes(appFingerprint) || payload.body.includes('<title>项目甘特图生成器</title>');
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const rawPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const resolvedPath = path.normalize(decodeURIComponent(rawPath)).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(publicDir, resolvedPath);

  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === 'OPTIONS') {
      response.writeHead(204, getCorsHeaders(request));
      response.end();
      return;
    }

    if (request.method === 'GET') {
      await serveStatic(request, response);
      return;
    }

    response.writeHead(405, { Allow: 'GET, POST' });
    response.end('Method not allowed');
  } catch (error) {
    sendJson(request, response, 400, { error: error instanceof Error ? error.message : String(error) });
  }
});

server.once('error', async (error) => {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
    const alreadyRunning = await isCurrentAppAlreadyRunning(port);
    if (alreadyRunning) {
      console.log(`Gantt builder already running at http://127.0.0.1:${port}`);
      process.exit(0);
      return;
    }

    console.error(`Port ${port} is already in use. Stop the existing process or start with PORT=<new-port> node server.mjs`);
    process.exit(1);
    return;
  }

  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Gantt builder running at http://${host}:${port}`);
});
