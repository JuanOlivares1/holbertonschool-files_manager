import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class appController {
  static getStatus(req, res) {
    res.status(200);
    res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive()});
  };

  static getStats(req, res) {
    res.status(200);
      res.json({ users: dbClient.nbUsers, files: dbClient.nbFiles });
  };
}
const AppController = new appController();
module.exports = AppController;
