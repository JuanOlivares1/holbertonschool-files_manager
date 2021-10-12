import { createClient } from 'redis';
import { promisify } from 'util';


class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err))
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getval = await promisify(this.client.get).bind(this.client);
    const val = await getval(key);
    return val;
  }

  async set(key, value, time) {
    await this.client.setex(key, value, time);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
