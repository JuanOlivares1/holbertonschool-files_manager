import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const crypto = require('crypto');

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.header('Authorization');
    const data = authHeader.slice(6);

    const buff = Buffer.from(data, 'base64');
    const auth = buff.toString('ascii');
    const _auth = auth.split(':');
    const _email = _auth[0];
    const password = _auth[1];
    const hashedPw = crypto.createHash('sha1').update(password, 'utf-8').digest('hex');

    const dbCollection = dbClient.db.collection('users');
    const field = await dbCollection.find({ email: _email, password: hashedPw }).toArray();

    if (field.length > 0) {
      let _token = 'auth_';
      _token += uuidv4();
      await redisClient.set(_token, field[0]._id.toString(), 86400);
      return res.status(200).json({ token: _token });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async getDisconnect(req, res) {
    let _token = 'auth_';
    _token += req.header('X-Token');

    const redisResp = await redisClient.get(_token);
    if (!redisResp) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(_token);
    return res.status(204).send();
  }
}

module.exports = AuthController;
