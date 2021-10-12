import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  constructor() {
    this.getStatus = (req, res) => {
      if (dbClient.isAlive() && redisClient.isAlive()) {
        res.status(200);
        res.json({ redis: true, db: true });
      }
    };

    this.getStats = (req, res) => {
      res.status(200);
      res.json({ users: dbClient.nbUsers, files: dbClient.nbFiles });
    };
  }
}

exports.AppController = new AppController();
