import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    res.status(200);
    res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive()});
  };

  async static getStats(req, res) {
    res.status(200);
    res.json({ users: await dbClient.nbUsers, files: await dbClient.nbFiles });
  };
}

module.exports = AppController;
