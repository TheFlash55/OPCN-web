import { Redis } from "@upstash/redis";

type JsonValue = unknown;

type SimpleRedisLike = {
  get: <T = JsonValue>(key: string) => Promise<T | null>;
  set: <T = JsonValue>(key: string, value: T) => Promise<unknown>;
};

const memoryStore = new Map<string, JsonValue>();

function createMemoryRedis(): SimpleRedisLike {
  return {
    async get<T = JsonValue>(key: string) {
      return (memoryStore.has(key) ? (memoryStore.get(key) as T) : null);
    },
    async set<T = JsonValue>(key: string, value: T) {
      memoryStore.set(key, value);
      return "OK";
    },
  };
}

const hasUpstashEnv = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

export const redis: SimpleRedisLike = hasUpstashEnv ? Redis.fromEnv() : createMemoryRedis();
