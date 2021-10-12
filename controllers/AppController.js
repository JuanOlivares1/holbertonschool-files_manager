import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class appController {
  constructor() {
    this.getStatus = (req, res) => {
      res.status(200);
      res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive()});
    };

    this.getStats = (req, res) => {
      res.status(200);
      res.json({ users: dbClient.nbUsers, files: dbClient.nbFiles });
    };
  }
}
const AppController = new appController();
module.exports = AppController;
