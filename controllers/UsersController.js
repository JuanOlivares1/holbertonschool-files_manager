import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const crypto = require('crypto');

class UsersController {
  static async postNew(req, res) {
    const dbCollection = dbClient.db.collection('users');
    const { email } = req.body;
    const { password } = req.body;

    if (!email) res.status(400).json( {error: 'Missing email'} );
    if (!password) res.status(400).json( {error: 'Missing password'} );

    const hashedPw = crypto.createHash('sha1').update(password, 'utf-8').digest('hex');

    const field = await dbCollection.find( {email: email} ).toArray();
    if (field.length > 0) {
      return res.status(400).json( {error: 'Already exist'} );
    }
    await dbCollection.insertOne( {'email': email, 'password': hashedPw} );
    res.status(201).json( {email: email, password: hashedPw} );
  }
}

module.exports = UsersController;
