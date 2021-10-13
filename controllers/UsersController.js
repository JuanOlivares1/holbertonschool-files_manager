import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static postNew(req, res) {
    const DbClient = dbClient;
    // const userCollection = await DbClient.db.collection('users');

    if (!email) res.status(400).send({error: 'Missing email'});
    if (!password) res.status(400).send({error: 'Missing password'});
    console.log('it works so far');
  }
}

module.exports = UsersController();