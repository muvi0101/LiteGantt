import crypto from 'node:crypto';

const upstashRedisUrl = (process.env.UPSTASH_REDIS_REST_URL || '').trim().replace(/\/+$/, '');
const upstashRedisToken = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
const exportKeyPrefix = process.env.EXPORT_KEY_PREFIX || 'litegantt:export:v1:';
const count = Math.max(1, Math.min(Number(process.argv[2] || 10), 500));
const ttlDays = Number(process.env.EXPORT_KEY_TTL_DAYS || 0);

if (!upstashRedisUrl || !upstashRedisToken) {
  console.error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN');
  process.exit(1);
}

function createExportKey() {
  return `LG-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function hashExportKey(exportKey) {
  return crypto.createHash('sha256').update(exportKey).digest('hex');
}

async function upstashCommand(command) {
  const response = await fetch(upstashRedisUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${upstashRedisToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) {
    throw new Error(payload.error || `Upstash request failed with ${response.status}`);
  }
  return payload.result;
}

async function saveKey(exportKey) {
  const redisKey = `${exportKeyPrefix}${hashExportKey(exportKey)}`;
  const value = JSON.stringify({
    createdAt: new Date().toISOString(),
    purpose: 'litegantt-export',
  });
  const command = ['SET', redisKey, value, 'NX'];
  if (ttlDays > 0) command.push('EX', Math.round(ttlDays * 24 * 60 * 60));
  const result = await upstashCommand(command);
  return result === 'OK';
}

const exportKeys = [];
while (exportKeys.length < count) {
  const exportKey = createExportKey();
  if (await saveKey(exportKey)) exportKeys.push(exportKey);
}

console.log(exportKeys.join('\n'));
