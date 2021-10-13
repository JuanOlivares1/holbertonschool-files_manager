import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    res.status(200);
    res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    const dir = { users: await dbClient.nbUsers(), files: await dbClient.nbFiles() };
    res.status(200);
    res.json(dir);
  }
}

module.exports = AppController;
