import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const crypto = require('crypto');
const { uuid } = require('uuid');

class AuthController {
  static async getConnect(req, res) {
    // get header with email:password encoded(base64)
    const authHeader = req.header('Authorization');
    // get string from header
    const data = authHeader.slice(4);
    console.log('header str got: ', authHeader);
    // decode data
    const buff = Buffer.from(data, 'base64');
    const auth = buff.toString('ascii');
    console.log('decoded str: ', auth);
    const _email = auth.split(':', 1)[0];
    const password = auth.split(':', 1)[0];
    console.log('email: ', _email);
    console.log('psswd: ', password);
    const hashedPw = crypto.createHash('sha1').update(password, 'utf-8').digest('hex');
    // verify user exists on db
    const dbCollection = dbClient.db.collection('users');
    const field = await dbCollection.find({ email: _email, password: hashedPw }).toArray();
    // if exists generate token, else unauthorized(401)
    if (field.length > 0) {
      let _token = 'auth_';
      _token += uuid();
      console.log('token: ', _token);
      console.log('user_id: ', field[0]._id);
      await redisClient.set(_token, field[0]._id, 86400);
      return res.status(200).json({ token: _token });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async getDisconnect(req, res) {
    // get token from header
    const _token = req.header('X-Token');
    console.log('token got: ', _token);
    // check token on redis
    const redisResp = await redisClient.get(_token);
    if (!redisResp) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(redisResp);
    await redisClient.del(_token);
    return res.status(204).send();
  }
}

module.exports = AuthController;
