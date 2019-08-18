import BaseRepository from './BaseRepository';
import bcrypt from 'bcryptjs';

class UserRepository extends BaseRepository {
    constructor () {
        super('User');
    }

    async Create(record: any) {
        record.password = bcrypt.hashSync(record.password, bcrypt.genSaltSync(8));
        return super.Create(record);
    }
}

export default UserRepository;