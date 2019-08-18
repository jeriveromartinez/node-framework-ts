import bcrypt from 'bcryptjs';
import BaseModel from './Base.Model';

class UserModel extends BaseModel {
    User: any;
    constructor (mongoose) {
        super(mongoose, 'User');
    }

    Initialize() {
        this.User = new this.mongoose.Schema({
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            createdAt: { type: Date, default: Date.now() },
            removed: { type: Boolean, default: false }
        }, { versionKey: false });

        this.User.methods.validPassword = function (password) {
            const comparePass = this.password;
            return bcrypt.compareSync(password, comparePass);
        };

        return this.mongoose.model(this.name, this.User);
    }
}

export default UserModel;