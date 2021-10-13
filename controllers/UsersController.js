import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const crypto = require('crypto');

class UsersController {
  static async postNew(req, res) {
    const dbCollection = dbClient.db.collection('users');
    const _email = req.body.email;
    const { password } = req.body;

    if (!_email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });

    const hashedPw = crypto.createHash('sha1').update(password, 'utf-8').digest('hex');

    const field = await dbCollection.find({ email: _email }).toArray();
    if (field.length > 0) {
      return res.status(400).json({ error: 'Already exist' });
    }
    const newUser = await dbCollection.insertOne({ email: _email, password: hashedPw });
    return res.status(201).json({ email: _email, id: newUser.insertedId });
  }

  static async getMe(req, res) {
    const _token = req.header('X-Token');
    const dbCollection = dbClient.db.collection('users');
    const redisResp = await redisClient.get(_token);
    if (!redisResp) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const field = await dbCollection.find({ _id: redisResp }).toArray();
    if (field.length > 0) {
      res.status(200).json({ id: redisResp, email: field[0].email });
    }
    console.log('last line ...');
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = UsersController;
