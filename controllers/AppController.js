import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
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

exports.AppController = new AppController();
